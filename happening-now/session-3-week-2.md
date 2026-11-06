---
title: Sprint 3 Week 2 - Board Game Bots
date: 2026-11-09
---

**Welcome to the build week for sprint 3!** Hopefully you have had a chance to review the workshops from last week (all videos and recordings are below) and are ready to build your bots for Megagem! This week will consist of 3 office hour slots (total of 6 hours) in Tsai CITY, listed below. If you have any other questions outside of office hours, feel free to email ryan.fernandes@yale.edu. The assignment for this sprint is due **Sunday, November 22 at 11:59pm**. All pull requests to the `megagem-harness` repository must be created before this point. See the assignment specification and schedule for this week below!

**Assignment:**

For this sprint, your job will be to create intelligent bots capable of playing the game *Megagem* ([rules](https://djdumpling.github.io/2026/08/09/megagem.html)). To do this, you must follow these steps:

1. Read the rules and reason about simple strategies
2. Fork the [harness repo here](https://github.com/Ryfernandes/megagem-harness) and read through the code/comments
3. Implement your bots in the bot_definitions subdirectory
4. Test your bots in simulated games and iterate
5. Open a pull request to `Ryfernandes/megagem-harness` to submit

Below are some rules/guidelines that you must follow when creating your bots:

- You may work individually or in teams
- You can submit 1-3 bots per team
- Each bot must be defined in the `src/bot_definitions` subdirectory
- Each bot must be imported/added to the public API of `src/custom_bots.py` (the line with \_\_all__)
- Each bot must provide a response to function calls within a **maximum timeout of 2 seconds**. This timeout may increase, but it will not decrease
- **Each bot definition must be accompanied by some documentation (such as a multi-line comment at the top of the file) explaining the basic strategy of the bot and listing its contributors**
- (Optional) Write a blog about your bots and get featured on the y/cs website/LinkedIn!

At the end of the sprint, we will run some sort of simulation/tournament of the bots, depending on how many are submitted, and post the results. Catalyst points will be awarded for performance of the bots, as well as bot quality, which will be informed by the results of the simulation

**Sprint 3 Build Week Office Hours 1**
- When: Monday, November 9, 7-9pm
- Where: Tsai CITY, Ground Floor

**Sprint 3 Build Week Office Hours 2**
- When: Tuesday, November 10, 7-9pm
- Where: Tsai CITY, Ground Floor

**Sprint 3 Build Week Office Hours 3**
- When: Wednesday, November 11, 2:30-4:30pm
- Where: Tsai CITY, Ground Floor