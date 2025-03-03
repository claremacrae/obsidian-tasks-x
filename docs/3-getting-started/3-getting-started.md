---
layout: default
title: Getting Started
nav_order: 3
has_children: true
---

# Getting Started

Tasks tracks your checklist items from your vault. The simplest way to create a new task is to create a new checklist item.
The markdown syntax for checklist items is a list item that starts with spaced brackets: `- [ ] take out the trash`.
Now Tasks tracks that you need to take out the trash!

## Live Examples

If you download this documentation as a vault from the releases you can see all the queries execute live. If you are viewing this from the website you will not see any output for the queries.

## Tasks SQL Powered

To list all open tasks in a markdown file, simply add a [[5-queries-sql|Queries - SQL]] as a tasks code block like so:

 ```task-sql
 WHERE status->indicator != "x"
 ```

Now you have a list of all open tasks! This is enough to get started with tasks.

This new language requires a bit more explanation, this is covered in the [[5-queries-sql|Queries - SQL]] Section.

## Tasks Original

To list all open tasks in a markdown file, simply add a [[4-queries-basic| Queries - Basic]] as a tasks code block like so:

 ```tasks
 not done
 ```

Now you have a list of all open tasks! This is enough to get started with tasks.
You can _optionally_ start using one or more of the other features that Tasks offers.
Like, for example, [[3-getting-started/priority|priorities]] or [[3-getting-started/dates#start-date|dates]]

A more convenient way to create a task is by using the `Tasks: Create or edit` command from the command palette.
You can also bind a hotkey to the command.
The command will parse what's on the current line in your editor and pre-populate a modal.
In the modal, you can change the task's description, its due date, and a recurrence rule to have a repeating task.
See below for more details on due dates and recurrence.
You cannot toggle a task (un)done in the modal.
For that, do one of the following.

There are two ways to mark a task done:

1. In preview mode, click the checkbox at the beginning of the task to toggle the status between "todo" and "done".
2. In edit mode, use the command `Tasks: Toggle Done`.
    - The command will only be available if the cursor is on a line with a checklist item.
    - You can map the command to a hotkey in order to quickly toggle statuses in the editor view (I recommend to replace the original "Toggle checklist status" with it).
    - If the checklist item is not a task (e.g. due to a global filter), the command will toggle it like a regular checklist item.

A "done" task will have the date it was done appended to the end of its line.
For example: `✅ 2021-04-09` means the task was done on the 9th of April, 2021.

> [!WARNING]
> Whenever Tasks behaves in an unexpected way, please try restarting Obsidian.

> [!WARNING]
> Tasks only supports single-line checklist items.
>
> The task list rendered through this plugin **and** the checklist items
> from which the task list is built render only the first line of the item.
> Text after the first line in a multi-line checklist item is
> ignored (but is unaffected in the stored `.md` file).
>
> This works:
>
> ```markdown
> -   [ ] This is a task
>     -   This is a sub-item
>     -   Another sub-item
>     -   [ ] And a sub task
>         -   Even more details
> ```
>
> The following _does not work:_
>
> ```markdown
> -   [ ] This task starts on this line
>         and then its description continues on the next line
> ```

> [!WARNING]
> Tasks can only render inline footnotes. Regular footnotes are not supported.
>
> ```markdown
> -   [ ] This is a task^[with a working inline footnote]
> -   [ ] This footnote _will not work_[^notworking]
> ```

> [!WARNING]
> Tasks' support for block quotes inside tasks is limited. It renders correctly, but since Tasks only supports a single line, the meta-data of the task will be inside the block quote.

> [!WARNING]
> Tasks won't render spaces around list items if you have a list with empty lines.
>
> ```markdown
> -   [ ] First task before the empty line
>
> -   [ ] Another task. The empty line above will _not_ result in the tasks being more spaced out.
> ```

> [!WARNING]
> You can only put block links (`^link-name`) after metadata such as dates. Anything else will break the parsing of dates, priorities and recurrence rules.
>
> ```markdown
> -   [ ] Task with priority placed before tag _priority will not be recognized_ 🔼 #tag
> -   [ ] Task with date placed before tag _date will not be recognized_ 📅 2021-04-09 #tag
> -   [ ] Task with block link _works_ 📅 2021-04-09 ^e5bebf
> -   [ ] Task with tag before priority _works_ #tag 🔼
> ```

> [!WARNING]
> Tasks only supports checklist items in markdown files with the file extension `.md`.

For more information please see the rest of this vault / site.
