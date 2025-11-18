---
title: "An Introvert's Guide to Pair Programming (Spoiler…It's AI)"
description: AI in your workflow with VS Code, Continue, and Ollama.
author: "Greg Barbosa"
featured: false

pubDate: 'Sep 18 2024'
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/mMoFxfPBlII" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="An Introvert's Guide to Pair Programming"></iframe>

Last week, I was invited to speak at South Florida Tech Hub's DevDive event. We talked about AI, specifically large language models, and how developers can integrate them into their workflows. If any of you were there, thank you for attending! All the post talk conversations were a lot of fun.

In keeping with the open-source community spirit, I've decided to share my unedited script below offering insight into how I structured the talk and managed time to maintain a smooth flow. Originally, I thought an hour of time might be challenging to fill, but day-of I found myself having a lot more to say more than the time would allow.

I'll be posting a video on YouTube soon going through the Ollama and Continue install process. [Subscribe to my channel](http://www.youtube.com/@gregbarbosa0) to get notified when it's live. For now, I've added all my recommended resources just below, and I hope that makes finding what you need easier.

## Resources

### Tools

- [Ollama](https://www.ollama.com)
- [VS Code](https://code.visualstudio.com/)
- [Continue.dev](https://www.continue.dev/)

### News and Communities

- [reddit.com/r/localllama](https://reddit.com/r/localllama)
- [news.ycombinator.com](https://news.ycombinator.com)
- Continue.dev
  - [docs](https://docs.continue.dev/intro)
  - [discord](https://discord.com/invite/EfJEfdFnDQ)
- Ollama
  - [docs](https://github.com/ollama/ollama/tree/main/docs)
  - [discord](https://discord.com/invite/ollama)

### Recommended Models

These are the models I'm currently running day to day on my 2021 M1 MacBook Pro with 16 RAM.

#### Chatting

**mistral-nemo:12b** (`ollama pull mistral-nemo`)

Bar none, my current favorite model is one built in collaboration with NVIDIA. Mistral NeMo is rock-solid at reasoning, coding, and chatting. And even more importantly, it's great at following explicit instructions. Great for all around day to day work. I throw text formatting, reasoning, and basic coding tasks and it handles everything like a champ.

**llama-3.1:8b** (`ollama pull llama3.1`)

From Meta, Llama 3.1 405B benchmarks near GPT-4 levels, although you most likely won't be able to run that model locally. Step down to the 8B model and you'll still get a great model to chat and work through problems on. I've noticed it's slower than Mistral NeMo, but sometimes it understands complex problems better.

#### Coding

**granite-code:8b** (`ollama pull granite-code:8b`)

A lightweight coding model from IBM trained on 116 programming languages. While it seems to fall apart at more complex tasks, it's fast at fixing and ideating existing codebases. I've debugged and tweaked multiple projects with just granite-code:8b at my side.

**deepseek-coder-v2:16b** (`ollama pull deepseek-coder-v2`)

This Mixture-of-Experts (MoE) model trained on 338 programming languages can most likely handle any dev project your working on. It's my favorite coding model, but I rarely ever run it since it slows my computer to a crawl. But if I'm deep in a problem and need some support, this is the model I'll call after granite-code.

#### Autocomplete Models

These models are strong replacements for GitHub's Copilot in VS Code. While not as creative with their answers, they can easily autocomplete whatever code your about to write, before you write it.

I prefer `granite-code:3b`, but `starcoder2:3b` seems to be a faster model in my day-to-day usage.

- [starcoder2:3b](https://ollama.com/library/starcoder2) (`ollama pull starcoder2`)
- [granite-code:3b](https://ollama.com/library/granite-code:3b) (`ollama pull granite-code:3b`)

## Script

### 6:00PM - Intro

Thank you to South Florida TechHub for putting this on. Thank you to Rebecca Bakels for thinking of me and inviting me here tonight. And thank _you_ for showing up tonight, taking a chance on me, and helping to foster the developer community we have here in South Florida.

**Who am I?** Greg Barbosa

**Why am I qualified to be here?** I've recently sunset my conversion rate optimization agency and now working full time as the Director of Innovation and Systems at Avulux, a brand selling clinically proven lenses that filters light to help people living with migraines.

Before that, I was a writer and the product manager at the 9to5Mac network of sites. Before that, an iOS QA/test engineer working on MDM products directly with customers like RIM (Blackberry).

**What are we talking about?** Today we'll be exploring what it looks like to use generative AI, specifically large language models (LLMs), in your software development workflow. We'll kick off the conversation by going over the current ethical and societal implications of these systems, and how we can still engage with them locally and privately if we so choose.

**When/where can I start using this type of AI?** Today! There's a good chance you can run at least one AI model on your computer today, and we'll cover that.

**Why AI?** Our current stage of AI is the worst it'll ever be, and the best it has ever been. Thanks in large part to the scientists, mathematicians, and various levels of engineers involved in making this generation of AI, one that many of us can participate in and benefit from it.

### 6:10PM - Ethical and Moral Implications

#### Creative Art Theft

It's no secret that OpenAI and Anthropic, are actively using publicly accessible data to train their LLMs. It's also no secret they financially benefited from taking others creative work, repackaging it into a tool, and making millions.

publicly accessible data != public data

And while these models are trained to never explicitly recreate someone's work, the fact that they have to put guardrails in for that already means they have the ability to do so.

If these models were built off anyone's work, then these people should be compensated. That's where open LLMs come in to play. These large language models are made publicly available for others to download for free, inspect, and use. In some cases, these models are even licensed for commercial use.

Having free access to these models is great, but none of that absolves these companies from creative theft.

#### Privacy

Most interactions made through ChatGPT and Claude's websites are used to further train the in-house models. (But there are enterprise options out there to avoid this though.) This also means that your requests are running through their servers. If you're doing sensitive work, you might prefer to do it in a way that no one else even has the possibility of seeing what you're doing.

And that's the best part about these LLMs. Once downloaded, these models are also available offline. No internet access needed. And because they're _local_ models, they never send or receive web data, unless you specifically tell it to. This means your conversations and work stay local and away prying eyes.

For my day job, I fed a local model internal work docs, and now it can quickly scope out copy and layout design for our product pages. And all of this, is offline.

#### Environmental Impact

The environmental impact of AI is still yet to be fully realized. The amount of compute and cooling needed to handle these systems is still in it's early stages. UC Riverside's report states that for roughly every 10 - 50 GPT-3 responses, 500ml (or about one water bottle) worth of water is consumed.

This is the one of the biggest reasons I moved from private to open LLMs. If I had even a small chance of reducing my overall energy usage, why not try it out?

#### Small Tangent

If the AI conversation on data theft and privacy concerns you, I implore you to also look into ad-blocking and web browsing privacy basics. For example, did you know that a few months ago Chrome enabled a feature that turns it into a top-of-funnel ad tracking platform?

### 6:20 - Where Do I Start?

To get started using LLMs locally, we'll be using three tools: Ollama, VS Code, and the VS Code extension Continue.dev.

#### Ollama

Ollama makes downloading and running large language models significantly easier. It's also the thing that will eventually connect with VS Code.

**Models:** We'll be using Ollama to download models. Think of models as the result of different people's improvements and takes on what an LLM can do. For example, there are some models that can "see" what's in an image, and some models that really good at coding work specifically.

#### VS Code

VS Code is Microsoft's code editor, free for all systems.

#### Continue.dev

Continue.dev is the VS Code extension that will connect our large language models downloaded from Ollama into VS Code. We're not only going to be able to chat with our code, but it'll give us the chance to integrate docs, write git commit messages, debug issues, and so much more. When used together, they may just improve your development workflow.

**Why Continue.dev?** If you've been on X lately you've probably seen the major hype around Cursor. Cursor is an AI code editor based on VS Code. In the early days, Cursor allowed you to use local models for free, but eventually pulled that feature.

Continue.dev lets you use any LLM you want, whether it's local or something like Claude and ChatGPT. You can configure API endpoints, API keys, and models to your liking.

And although we're talking about Continue, there are other apps out there that work very similarly. And a lot of them support Ollama too!

But I'm biased here. I started the year as a die hard Cursor fan, but found my way to Continue and been a fan ever since.

### 6:40 - How to Use LLMs with Your Code

#### What LLMs Won't Do

In the same way you have code completion, docs, and reference materials, LLMs are just another tool in your toolset. They are not a panacea for your development woes. They won't magically make you a better developer, but they sure as hell can help you speed that along.

#### Context

With LLMs, context is king. With Continue.dev, you could combine your project-specific code question, reference your entire codebase, point to official docs, and have your LLM give you an even better, more qualified answer.

Instead of copying and pasting code from a browser window into VS Code, you're having a context-aware conversation right where you code. I found this helps me stay in longer flow states too.

When using Continue and similar tools, start by giving your LLM context. I like to initiate conversations by describing my project, outlining my current task or goal, and then detailing out the project's tech stack. This context drastically improves the LLMs ability to give me actionable answers.

It's the difference between getting a response in JavaScript or TypeScript.

#### Roles

LLMs are phenomenal at what they do, and they do it even better when you treat it with a specific role in mind. Keep your questions aligned with that in mind, and explicitly communicate.

In my experience, you can treat LLMs like junior developers, senior developers, and/or pair programmers.

**Junior developers:** Without much context, you can often point the LLM at your code and have it update some functionality. It may not be the cleanest or most performant code, but it'll get things done quickly enough to validate functionality.

**Senior developers:** These are the type of requests that go beyond simple code adjustments into writing out small applications. With the right context, goal setting, and clarity, you can work alongside the LLM to build out a small app with you.

**Pair programmer:** And my favorite way of using LLMs with code is as a pair programmer. It's rubber ducky programming for the 21st century. I ideate projects and goals, scope out workloads, and even write snippets of code together.

### 6:50 - What Else Can I Do with LLMs?

We've just scratched the surface on what's possible with these systems.

What kind of models exist? There are vision models made specifically for identifying content in an image. Models that are trained on large codebases to become solid coder LLMs. There are models specifically designed to maintain conversational flow and awareness that some D&D dungeon masters seem to like. Just yesterday an incredible text-to-speech model was released.

Now that you have Ollama installed, you can start using loads of third-party apps and plugins that work directly with your preferred's LLM.

- **Page Assist for Chrome** lets you chat directly with a page's contents.
- **Ollama for Raycast** lets you use pre-made and custom prompts to your LLM to get things done quickly.
- **Open WebUI** let's you basically create your own version of ChatGPT with a local LLM, but gives you access to extra tools and functions made by the community.
