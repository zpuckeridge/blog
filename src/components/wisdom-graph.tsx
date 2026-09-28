import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
} from "d3-force";
import type {
  Force,
  Simulation,
  SimulationLinkDatum,
  SimulationNodeDatum,
} from "d3-force";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

import type { QuoteAuthor } from "@/interfaces/content-item";
import { cn } from "@/lib/utils";

type NodeKind = "author" | "hub" | "quote";

interface SimNode extends SimulationNodeDatum {
  authorId: string;
  id: string;
  kind: NodeKind;
  radius: number;
  text: string;
}

interface PlacedNode {
  authorId: string;
  id: string;
  kind: NodeKind;
  text: string;
  x: number;
  y: number;
}

interface PlacedLink {
  sourceId: string;
  targetId: string;
}

interface StageSize {
  height: number;
  width: number;
}

interface WisdomGraphProps {
  authors: QuoteAuthor[];
}

interface DragState {
  id: string;
  moved: boolean;
  originX: number;
  originY: number;
}

const DRAG_THRESHOLD_PX = 4;
const HUB_ID = "hub";
const quoteLink = forceLink<SimNode, SimulationLinkDatum<SimNode>>()
  .id((node) => node.id)
  .distance((link) => {
    const source = typeof link.source === "object" ? link.source : null;
    const target = typeof link.target === "object" ? link.target : null;
    const sourceRadius = source?.radius ?? 48;
    const targetRadius = target?.radius ?? 48;
    const involvesQuote = source?.kind === "quote" || target?.kind === "quote";
    return sourceRadius + targetRadius + (involvesQuote ? 48 : 180);
  })
  .strength(0.2);

const pointInStage = (
  stage: HTMLElement | null,
  clientX: number,
  clientY: number
): { x: number; y: number } | null => {
  if (!stage) {
    return null;
  }

  const rect = stage.getBoundingClientRect();
  return {
    x: clientX - rect.left,
    y: clientY - rect.top,
  };
};

const createBoundForce = (size: StageSize): Force<SimNode, never> => {
  let nodes: SimNode[] = [];

  const force: Force<SimNode, never> = () => {
    for (const node of nodes) {
      const x = node.x ?? 0;
      const y = node.y ?? 0;
      const minX = node.radius;
      const maxX = Math.max(node.radius, size.width - node.radius);
      const minY = node.radius;
      const maxY = Math.max(node.radius, size.height - node.radius);

      if (x < minX) {
        node.vx = (node.vx ?? 0) + (minX - x) * 0.08;
      } else if (x > maxX) {
        node.vx = (node.vx ?? 0) - (x - maxX) * 0.08;
      }

      if (y < minY) {
        node.vy = (node.vy ?? 0) + (minY - y) * 0.08;
      } else if (y > maxY) {
        node.vy = (node.vy ?? 0) - (y - maxY) * 0.08;
      }
    }
  };

  force.initialize = (next) => {
    nodes = next;
  };

  return force;
};

const authorNode = (
  author: QuoteAuthor,
  index: number,
  count: number,
  size: StageSize
): SimNode => {
  const angle = (index / count) * Math.PI * 2 - Math.PI / 2;
  const ring = Math.min(size.width, size.height) * 0.22;

  return {
    authorId: author.id,
    id: author.id,
    kind: "author",
    radius: 48,
    text: author.name,
    x: size.width / 2 + Math.cos(angle) * ring,
    y: size.height / 2 + Math.sin(angle) * ring,
  };
};

const quoteNode = (
  quote: QuoteAuthor["quotes"][number],
  parent: SimNode,
  index: number,
  count: number,
  size: StageSize
): SimNode => {
  const angle = (index / Math.max(count, 1)) * Math.PI * 2;

  return {
    authorId: parent.authorId,
    id: quote.id,
    kind: "quote",
    radius: 36,
    text: quote.title,
    x: (parent.x ?? size.width / 2) + Math.cos(angle) * 120,
    y: (parent.y ?? size.height / 2) + Math.sin(angle) * 120,
  };
};

const WisdomCanvas = ({ authors }: WisdomGraphProps) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const simulationRef = useRef<Simulation<
    SimNode,
    SimulationLinkDatum<SimNode>
  > | null>(null);
  const nodeMapRef = useRef(new Map<string, SimNode>());
  const dragRef = useRef<DragState | null>(null);
  const suppressClickRef = useRef(false);
  const [size, setSize] = useState<StageSize>({ height: 0, width: 0 });
  const [expandedAuthorId, setExpandedAuthorId] = useState<string | null>(null);
  const [activeQuoteId, setActiveQuoteId] = useState<string | null>(null);
  const [layout, setLayout] = useState<{
    links: PlacedLink[];
    nodes: PlacedNode[];
  }>({
    links: [],
    nodes: [],
  });

  const expandedAuthor =
    authors.find((author) => author.id === expandedAuthorId) ?? null;

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) {
      return;
    }

    const updateSize = () => {
      const next = {
        height: stage.clientHeight,
        width: stage.clientWidth,
      };
      setSize((current) =>
        current.width === next.width && current.height === next.height
          ? current
          : next
      );
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (size.width === 0 || size.height === 0) {
      return;
    }

    const simulation = forceSimulation<SimNode>()
      .force("charge", forceManyBody<SimNode>().strength(-140))
      .force("link", quoteLink)
      .force("center", forceCenter(size.width / 2, size.height / 2))
      .force(
        "collide",
        forceCollide<SimNode>()
          .radius((node) => node.radius + 16)
          .iterations(3)
      )
      .force("x", forceX<SimNode>(size.width / 2).strength(0.008))
      .force("y", forceY<SimNode>(size.height / 2).strength(0.008))
      .force("bounds", createBoundForce(size))
      .on("tick", () => {
        const nodes = simulation.nodes();
        const links: PlacedLink[] = [];

        for (const link of quoteLink.links()) {
          const source = link.source as SimNode;
          const target = link.target as SimNode;
          links.push({ sourceId: source.id, targetId: target.id });
        }

        setLayout({
          links,
          nodes: nodes.map((node) => ({
            authorId: node.authorId,
            id: node.id,
            kind: node.kind,
            text: node.text,
            x: node.x ?? 0,
            y: node.y ?? 0,
          })),
        });
      });

    simulationRef.current = simulation;

    return () => {
      simulation.stop();
      simulationRef.current = null;
    };
  }, [size]);

  useEffect(() => {
    const simulation = simulationRef.current;
    if (!simulation || size.width === 0 || size.height === 0) {
      return;
    }

    const liveIds = new Set<string>();
    const next: SimNode[] = [];

    const visibleAuthors = expandedAuthor ? [expandedAuthor] : authors;

    for (const [index, author] of visibleAuthors.entries()) {
      liveIds.add(author.id);
      const existing = nodeMapRef.current.get(author.id);
      const node =
        existing ?? authorNode(author, index, visibleAuthors.length, size);
      node.text = author.name;
      nodeMapRef.current.set(author.id, node);
      next.push(node);
    }

    const hub = nodeMapRef.current.get(HUB_ID) ?? {
      authorId: HUB_ID,
      id: HUB_ID,
      kind: "hub" as const,
      radius: 12,
      text: "",
      x: size.width / 2,
      y: size.height / 2,
    };
    hub.fx = size.width / 2;
    hub.fy = size.height / 2;
    nodeMapRef.current.set(HUB_ID, hub);
    liveIds.add(HUB_ID);
    next.push(hub);

    const parent = expandedAuthor
      ? nodeMapRef.current.get(expandedAuthor.id)
      : undefined;
    if (expandedAuthor && parent) {
      for (const [index, quote] of expandedAuthor.quotes.entries()) {
        liveIds.add(quote.id);
        const existing = nodeMapRef.current.get(quote.id);
        const node =
          existing ??
          quoteNode(quote, parent, index, expandedAuthor.quotes.length, size);
        node.text = quote.title;
        nodeMapRef.current.set(quote.id, node);
        next.push(node);
      }
    }

    for (const id of nodeMapRef.current.keys()) {
      if (!liveIds.has(id)) {
        nodeMapRef.current.delete(id);
      }
    }

    const links: SimulationLinkDatum<SimNode>[] = visibleAuthors.map(
      (author) => ({
        source: author.id,
        target: HUB_ID,
      })
    );

    if (expandedAuthor) {
      for (const quote of expandedAuthor.quotes) {
        links.push({
          source: expandedAuthor.id,
          target: quote.id,
        });
      }
    }

    simulation.nodes(next);
    quoteLink.links(links);
    simulation.alpha(0.75).restart();
  }, [authors, expandedAuthor, size]);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage || layout.nodes.length === 0) {
      return;
    }

    let changed = false;

    for (const placed of layout.nodes) {
      const node = nodeMapRef.current.get(placed.id);
      const element = stage.querySelector(`[data-node-id="${placed.id}"]`);
      if (!node || !(element instanceof HTMLElement)) {
        continue;
      }

      const previous = node.radius;
      node.radius = Math.round(
        Math.hypot(element.offsetWidth, element.offsetHeight) / 2 + 8
      );
      if (node.radius !== previous) {
        changed = true;
      }
    }

    if (changed) {
      simulationRef.current?.alpha(0.6).restart();
    }
  }, [layout]);

  const toggleAuthor = (authorId: string) => {
    if (expandedAuthorId === authorId) {
      setExpandedAuthorId(null);
      setActiveQuoteId(null);
      return;
    }

    setExpandedAuthorId(authorId);
    setActiveQuoteId(null);
  };

  const closeAuthor = () => {
    setExpandedAuthorId(null);
    setActiveQuoteId(null);
  };

  const focusQuote = (authorId: string, quoteId: string) => {
    setExpandedAuthorId(authorId);
    setActiveQuoteId(quoteId);
  };

  const handlePointerDown = (
    event: ReactPointerEvent<HTMLButtonElement>,
    nodeId: string
  ) => {
    const node = nodeMapRef.current.get(nodeId);
    const point = pointInStage(stageRef.current, event.clientX, event.clientY);
    if (!node || !point) {
      return;
    }

    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Window listeners still follow the pointer when capture is unavailable.
    }
    dragRef.current = {
      id: nodeId,
      moved: false,
      originX: point.x,
      originY: point.y,
    };
    node.fx = node.x;
    node.fy = node.y;
    simulationRef.current?.alphaTarget(0.25).restart();

    const move = (moveEvent: PointerEvent) => {
      const drag = dragRef.current;
      const dragged = drag ? nodeMapRef.current.get(drag.id) : undefined;
      const nextPoint = pointInStage(
        stageRef.current,
        moveEvent.clientX,
        moveEvent.clientY
      );
      if (!drag || !dragged || !nextPoint) {
        return;
      }

      const distance = Math.hypot(
        nextPoint.x - drag.originX,
        nextPoint.y - drag.originY
      );
      if (distance > DRAG_THRESHOLD_PX) {
        drag.moved = true;
      }

      dragged.fx = nextPoint.x;
      dragged.fy = nextPoint.y;
    };

    const end = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
      const drag = dragRef.current;
      const dragged = drag ? nodeMapRef.current.get(drag.id) : undefined;
      if (dragged) {
        dragged.fx = null;
        dragged.fy = null;
      }
      if (drag?.moved) {
        suppressClickRef.current = true;
      }
      dragRef.current = null;
      simulationRef.current?.alphaTarget(0);
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
  };

  const handleNodeClick = (node: PlacedNode) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }

    if (node.kind === "quote") {
      focusQuote(node.authorId, node.id);
      return;
    }

    toggleAuthor(node.id);
  };

  const nodeById = new Map(layout.nodes.map((node) => [node.id, node]));

  return (
    <div className="flex min-h-[calc(100dvh-9rem)] flex-col gap-8 px-6 pb-10 lg:flex-row lg:items-stretch">
      <div
        className="relative min-h-[70dvh] flex-1 lg:min-h-[calc(100dvh-9rem)]"
        ref={stageRef}
      >
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-visible text-neutral-400 dark:text-neutral-300"
          height={size.height}
          viewBox={`0 0 ${size.width} ${size.height}`}
          width={size.width}
        >
          {layout.links.map((link) => {
            const source = nodeById.get(link.sourceId);
            const target = nodeById.get(link.targetId);
            if (!source || !target) {
              return null;
            }

            return (
              <line
                key={`${link.sourceId}-${link.targetId}`}
                stroke="currentColor"
                strokeWidth={1.5}
                x1={source.x}
                x2={target.x}
                y1={source.y}
                y2={target.y}
              />
            );
          })}
        </svg>

        {layout.nodes.map((node) => {
          if (node.kind === "hub") {
            return (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute size-3.5 border border-black bg-transparent dark:border-white"
                data-node-id={node.id}
                key={node.id}
                style={{
                  transform: `translate(${node.x}px, ${node.y}px) translate(-50%, -50%)`,
                }}
              />
            );
          }

          const isAuthor = node.kind === "author";
          const isSelected = isAuthor
            ? node.id === expandedAuthorId
            : node.id === activeQuoteId;

          return (
            <button
              aria-expanded={
                isAuthor ? node.id === expandedAuthorId : undefined
              }
              aria-pressed={isAuthor ? undefined : isSelected}
              className={cn(
                "absolute cursor-grab touch-none px-1 text-black active:cursor-grabbing dark:text-neutral-300",
                isAuthor ? "text-lg" : "text-sm",
                isSelected && "bg-muted"
              )}
              data-node-id={node.id}
              key={node.id}
              onClick={() => handleNodeClick(node)}
              onPointerDown={(event) => handlePointerDown(event, node.id)}
              style={{
                transform: `translate(${node.x}px, ${node.y}px) translate(-50%, -50%)`,
              }}
              type="button"
            >
              {node.text}
            </button>
          );
        })}
      </div>

      <h1 className="sr-only">Wisdom</h1>
      {expandedAuthor ? (
        <aside className="w-full shrink-0 lg:w-80 lg:self-start">
          <div className="border border-border">
            <div className="flex items-center justify-between gap-4 border-border border-b border-dotted px-4 py-3">
              <h2 className="text-black text-lg dark:text-white">
                {expandedAuthor.name}
              </h2>
              <button
                aria-label={`Close quotes from ${expandedAuthor.name}`}
                className="text-lg leading-none"
                onClick={closeAuthor}
                type="button"
              >
                ×
              </button>
            </div>
            {expandedAuthor.quotes.length > 0 ? (
              <ul>
                {expandedAuthor.quotes.map((quote) => {
                  const isOpen = quote.id === activeQuoteId;

                  return (
                    <li
                      className="border-border border-b border-dotted last:border-b-0"
                      key={quote.id}
                    >
                      <button
                        aria-expanded={isOpen}
                        className="flex w-full items-start gap-3 px-4 py-3 text-left text-sm"
                        onClick={() =>
                          setActiveQuoteId(isOpen ? null : quote.id)
                        }
                        type="button"
                      >
                        <span aria-hidden="true">{isOpen ? "–" : "+"}</span>
                        <span>{quote.title}</span>
                      </button>
                      {isOpen ? (
                        <p className="px-4 pb-4 pl-10 text-sm leading-relaxed">
                          {quote.text}
                        </p>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="px-4 py-3 text-sm">No quotes yet.</p>
            )}
          </div>
        </aside>
      ) : null}
    </div>
  );
};

const WisdomGraph = ({ authors }: WisdomGraphProps) => {
  if (authors.length === 0) {
    return (
      <div className="mx-auto flex max-w-lg flex-col gap-4 px-6 pb-20">
        <h1 className="text-black text-xl dark:text-white">Wisdom</h1>
        <p className="text-sm">No quotes yet.</p>
      </div>
    );
  }

  return <WisdomCanvas authors={authors} />;
};

export default WisdomGraph;
