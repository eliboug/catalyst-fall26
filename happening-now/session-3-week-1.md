---
title: Sprint 3 Week 1 - Board Game Bots
date: 2026-11-02
---

**Welcome to Sprint 3!** This sprint, we will be learning to build simple board game bots, using the auction-style card game *Megagem*, produced by Richard Garfield and Jane Street. You will learn about the game itself, the role of harnesses is, and common techniques for designing intelligent bots. At the end of the sprint, you will submit up to 3 bots to the `megagem-harness` repository, which will then be entered into a tournament against everyone else's! Hopefully, by the end of it, we will have some better insight into what simple strategies prevail over others in this game. Below, find workshop schedules, slides, recordings and notes for the first week.

Questions? Email ryan.fernandes@yale.edu

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

**Workshop 1: Introducing the Game**
- When: Tuesday, November 3, 7-9pm
- Where: WLH 209
- Slides: [Here!](https://docs.google.com/presentation/d/1PaI0qWBsGknhaMI-bG9V36hds26Lo0rrAO6IKLHUGBo/edit?usp=sharing)
- Recording: NA

Summary: In this workshop, we reviewed the rules for Megagem, focusing on the points at which players need to make decisions and what information is relevant to them when they do. A good online manual for Megagem can be found [here](https://drive.google.com/file/d/1UJ5vC_hiZxsjL1OTeSHdk22Rgfb9j4BM/view), and check out [this interesting blog](https://djdumpling.github.io/2026/08/09/megagem.html) about Megagem strategy and a reinforcement-learning approach (likely more complicated than what you will do for your project).

**Workshop 2: The Harness**
- When: Wednesday, November 4, 5-6:30pm
- Where: WLH 207
- Slides: [Here!](https://docs.google.com/presentation/d/19eHrwkpQzWFPgnp1_Y7NrlEMUmnYMrxFhGwJmmQzwFY/edit?usp=sharing)
- Recording: [Here!](https://youtu.be/LKmzQ7CDzns)

Summary: In this workshop, we walked through the harness that has been created for Megagem bot development. We traced through code segments, reviewed important data structures, and showed some example bot implementations. In addition, we learned how to simulate games with the harness, run robust experiments, and collect data. The link to the repository is [here](https://github.com/Ryfernandes/megagem-harness).

Practice: (15-30 min) Try implementing a bot that "rations" its coins! The bot should only bid when gems are up for auction and bid proportionally based on the number of gems up for auction compared to the total number of auctionable gems remaining. For example, if the bot has 10 coins left, 2 gems are up for auction, and there are 5 gems total left, it should bid 10 * 2 / 5 = 4 gems. Implement this bot and test it against the SmallBidBot! How does it perform?

If you have any requests for the harness or find any bugs, please let me know! (ryan.fernandes@yale.edu)

**Workshop 3: Building Smart Bots**
- When: Thursday, November 5, 5-6pm
- Where: WLH 117
- Slides: Coming Soon!
- Recording: Coming Soon!
