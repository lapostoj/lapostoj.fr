---
title: Clean Code by Robert C. Martin
date: "2018-07-28T00:00:00.000Z"
layout: post
draft: false
path: "/books/clean-code/"
category: "Books"
tags:
  - "Software Engineering"
  - "Clean Code"
description: "Robert C. Martin shares learning and good practices about how to write clean, readable and maintainable code. These are from his own career and experiences as well as friends and colleagues."
---

<figure class="float-left" style="width: 240px">
  <img src="./clean-code-cover.jpg" alt="Clean Code cover">
  <figcaption>Clean Code, Robert C. Martin</figcaption>
</figure>

## Summary

The book is mostly a list of the main good practices one should follow in order to write high quality code. High quality here is not really about performance or knowledge but code which is easy to read, understand, and change/update. The reasoning is that this is what you code will be used for most of its existence, as other people take over the system later on.

Some of the points can be up to discussion but most of the indications are pretty much common sense for whoever cares about the code they write. It also won't be anything too new for anyone with some experience with development in a professional context, but is always a good reminder and check list.

## Main points

The two mains points are caring about the code you write and thinking about it from a reader point of view. Pretty much everything in the book can be linked to these when you understand the examples and counter examples and imagine the trial and error people went through over time.

The book contains a final section summarizing the "rules" to follow and pointing the to examples. An interesting one to mention as well are the section and appendix about concurrent code as it might not be something you're dealing with every day.

### Caring

Caring is not only having the code working and solving the problem is should solve, but making sure it will remain like that. Meaning, it will keep working (hint: tests for the code) and it will be easy to change it to solve the "new" problem when requirements will change, because the will inevitably.

### Thinking as a reader

Changing the code for new requirements, likely won't be made by you, you will be in a different position and maybe even in a different company. But you code will still be there. So make it easy to read, understand and improve for whoever will do that job. Best (or worst?) case scenario, you will actually be the one doing the change, but future you is pretty much like any reader and might not remember all the details of the original implementation.