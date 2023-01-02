---
title: "🎂 Basic Age Calculator"
slug: age-calculator-component
date: "2023-01-02"
tags: Technical
description: Create a simple NextJS component that calculates and displays a person's age based on their birthday.
socialImage: images/birthday.jpg
---

In this short guide we'll be creating a simple React component that calculates and displays a person's age based on their birthday.

Here's the code for the component:

```js
export default function Age() {
  const birthday = new Date(1999, 8, 25); // September 25, 1999
  const currentDate = new Date();
  let age = currentDate.getFullYear() - birthday.getFullYear();

  // If the current date is before the birthday, subtract 1 from the age
  if (
    currentDate.getMonth() < birthday.getMonth() ||
    (currentDate.getMonth() === birthday.getMonth() &&
      currentDate.getDate() < birthday.getDate())
  ) {
    age--;
  }

  return <span>{age}</span>;
}
```

First, we create a new function called `Age` using the `export default` syntax, which makes the function available for import in other parts of our application. Inside the function, we create two `Date` objects: `birthday` and `currentDate`. `birthday` is set to September 25, 1999 (my actual birthday!) and `currentDate` is set to the current date.

Next, we create a variable called `age` and set it equal to the difference between the current year and the year of the person's birthday. This will give us the age in years.

However, this calculation is not entirely accurate because it doesn't take into account the month and day. For example, if the current date is January 1 and the person's birthday is on December 31, they have not yet had their birthday this year and are technically one year younger.

To fix this, we use an `if` statement to check if the current month and day are before the person's birthday. If it is, we subtract 1 from their age.

Finally, we use a `span` element to wrap the age and return it to be rendered on the page.

And that's it! With just a few lines of code, we've created a simple and effective NextJS and TypeScript component that calculates and displays a person's age.
