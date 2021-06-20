---
title: "📦 What is CI/CD?"
slug: what-is-ci-cd
date: 2021-05-18
tags: DevOps
description: A short Guide to Continuous Integration, Testing, Delivery and Deployment.
---

```toc

```

CI/CD, or better known as Continuous Integration, Continuous Delivery and Continuous Deployment, refers to the connected practices and process of pipeline deployment revolved around automation and continuous application development.

It is a method that aims to solve problems for operation teams integrating new code into large applications. It allows these teams to deliver updates more frequently and reliably with automated tests to ensure quality.

### What is Continuous Integration (CI)?

Continuous Integration is the process of continually integrating updates into a codebase. This process is often a consistent, automated process which builds, packages and tests the new update before pushing it into the codebase.

When developers make code changes into a shared repository setup with CI, an integration triggers an automatic build-and-test sequence which ensures that the changes do not return any errors.

The goal of this process is to allow builds, code updates and merges to happen as often as possible and remove the element of human error that so often arises when making changes to a codebase.

This process also allows developers to avoid merge conflicts, bugs and duplicate fixes that often occurred when merging large branches of code.

### What is Continuous Delivery (CD)?

Continuous Delivery allows developers to deploy changes made during the CI stage to different environments and end-users at any time.

Overall, this allows for smaller and more frequent releases that are less disruptive to the end user and developer team. Because of this, it also makes changes incredibly easy to troubleshoot or rollback.

### What is Continuous Testing?

Continuous Testing is the process of the using automated tests to check that code changes meet certain requirements and do not return errors that could break the application.

CI/CD processes can have many types of tests including the following:

- Unit Testing
- Integration Testing
- Functional Testing
- Acceptance Testing
- Static Code Analysis
- API Testing
- Security Testing

and more. While not an exhaustive list, it shows how tests are integrated into the CI/CD process. The goal of continuous testing is find problems quickly and alert the developer team before issues arise in production environments.

### What is a CI/CD Pipeline?

A CI/CD Pipeline is tightly integrated with the CI/CD process and introduces automation and monitoring to the improve the integration and testing phases, as well as delivery and deployment. A CI/CD Pipeline looks like a path with a series of stages that runs tests and safely deploys a new version of the application.

A CI/CD Pipeline typically includes the following stages:

- Build - Application is compiled.
- Test - Code is tested to ensure quality.
- Release - Application is delivered to the repository.
- Deploy - Changes are deployed to the production environment.
- Validation and Compliance

Automated Pipelines allow the fast deployment of new software updates, reliable build and test processes, fewer bugs in production and transparent logs of all changes, tests and deployments. Having this process automated, eradicates the much less productive method that focuses on performing the same steps manually.

### What are the advantages of using a CI/CD Process?

Overall, CI/CD allows for quicker, more reliable releases, greater visibility of projects and new builds, early bug detection, less time spent performing manual tasks and fast feedback on changes.

The goals of every developer working with a CI/CD process is to embrace automation, optimise testing strategies, embrace consistency and develop in smaller iterations.

If you have any questions or think I could have taken a better approach, let me know! Feel free to reach out in the comments below or reach out to me via [email](mailto:zacchary@puckeridge.me).
