## Case: Frontend Intern Challenge ##

### AI usage in context

I used AI as a coding helper along the way. Not to do the assignment for me, but to save time when I got stuck, check my ideas, and polish the final code.
Main tasks
Delete authorization mutation: AI helped me shape the delete handler with useDeleteAuthorizationMutation, especially around using try/catch and refetching the query.
Sorting state: I double-checked with AI how to manage sorting using useState and useMemo, and also got a cleaner compare function for dates and grouping by month.

Stretch goals

Visual improvements: Asked for feedback on styled-components (spacing, hover effects, theme colors, responsive drawer).
Interactive rows: Used AI as a sparring partner for making rows clickable and showing a detail drawer.
Loading and error states: Looked up how to design spinners.
Theme switching: Asked how to structure a small dropdown to switch between dark and light mode.

In short:
I wrote the code and made the design decisions myself. AI was mainly there to:
remind me of React and TypeScript syntax
suggest best practices
point out small pitfalls with hooks
give quick inspiration for styling tweaks

Overall reflection:
React is still a fairly new technology for me. Coming from a background with more C#, the biggest challenge has been getting used to the syntax and patterns in React/TypeScript. That’s also where AI helped me the most – bridging the gap so I could focus on the actual logic and design of the solution.



# 🚀 Lunar Frontend Intern Challenge ##

Welcome to the Lunar Frontend Intern Challenge! We’ve recreated a small feature inspired by real production code — a transaction list — and your mission is to add new functionality and polish it. You’ll be working with React, TypeScript, styled-components, and GraphQL (one query + one mutation are already scaffolded). The challenge consists of a few main tasks plus a bunch of optional ones.

## 🤖 AI usage

**Using AI is not considered cheating** — it’s a tool like any other, and knowing how to use it well is part of being a modern developer.

AI tools are a natural part of modern development workflows, and we don’t expect you to avoid them during this challenge. In fact, knowing how to use AI effectively and responsibly is a valuable skill — one we consider important.

You’re welcome to use AI for guidance, inspiration, or to help solve problems. All we ask is that you make a brief note (in comments, commit messages, or a small section at the end of this README) wherever AI meaningfully contributed to your solution. Most importantly, make sure you fully understand and can take ownership of the code you submit.

## 🛠 Quick start

```bash
pnpm install
pnpm run start  # opens http://localhost:3000
```

When the dev server starts you’ll see a simple app with a home page and a sidebar where you can navigate to the transactions view. Here you'll see a table of mock transactions fetched with `useTransactionsQuery`. The data is mocked locally.

---

## 🚩 Tasks

### 1️⃣ Delete an authorization (main task)

Every transaction has a status — either future, financial, or **authorization**. The purpose of this task is to add functionality that lets you delete transactions with the **authorization** status.

Add a “Delete” button on transaction rows where:

- `status === "authorization"`

Use the generated mutation hook:

```ts
import { useDeleteAuthorizationMutation } from "./transactions/delete_authorization";
```

Baseline (required):

1. Execute the mutation.
2. Make the row disappear after deletion **by adding** `refetchQueries: ['GetTransactions']` _or_ by filtering local state.

Extra-credit (optional): skip the refetch and update the UI **optimistically** using either `optimisticResponse` _or_ the `update(cache)` function.

### 2️⃣ Sort by date (main task)

Add a toggle (button or clickable column header) that switches between “newest first” and “oldest first”. Sorting must run client-side only.

---

## ✨ Stretch goals (optional)

If you finish the main tasks and still have time, here are some optional improvements you can explore:

1. Implement an optimistic cache update (if not already done).
2. Refine the visual design — improve table readability with theme colors, hover states, etc.
3. Add support for multi-criteria sorting (e.g., by status or title).
4. Make rows interactive — clicking a row could open a details drawer, dialog, or another pattern you think fits well
5. Improve loading and error states to enhance the user experience.
6. Add theme-switching functionality (a dark theme already exists in theme.ts).

---

## ⏱ Expected time

We expect you to spend up to eight hours on this challenge — and remember, we value good, clean code and a clear commit history more than the number of stretch goals completed. Focus on clarity, structure, and maintainability — that’s what we care about most.

---

## 📦 Submission

Push your solution to a public GitHub repo (or private and invite us) and share the link, or zip the folder and email it.

Good luck – and have fun! ✨
