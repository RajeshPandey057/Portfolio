---
title: 'Building a telehealth startup: 5 engineering lessons from Medsi'
seoTitle: 'Building a telehealth startup: 5 lessons from Medsi'
description: 'What 250,000+ downloads, 5,000+ consultations, and a 2024 acquisition taught me about reliability, integrations, small-team architecture, and technical diligence.'
pubDate: 'Jul 5 2026'
updatedDate: 'Aug 27 2026'
heroImage: '../../assets/telehealth-startup-cover.png'
heroImageAlt: 'A modular healthcare network connected to a central coral system'
tags: ['healthcare', 'startups', 'engineering-leadership']
takeaways:
  - 'In healthcare, reliability is part of the product because silent failures affect real patients.'
  - 'Third-party integrations deserve more design attention than the familiar center of the stack.'
  - 'Simple, legible systems help small teams move quickly and hold up during acquisition diligence.'
---

In 2022 I started building Medsi, a telehealth platform for India, as a side project alongside my full-time engineering role at TCS. By the time HelloWellness acquired it in 2024, we had crossed 250,000 app downloads and facilitated over 5,000 consultations. I led all of the backend, API, and mobile infrastructure, usually as the only person responsible for whether the system stayed up.

Here's what that experience actually taught me, none of which I could have learned at a big company.

## Reliability is a product feature in healthcare, not an engineering metric

When your app schedules a consultation with a doctor, a failed request is not just a retry. It can mean a person who needed medical attention did not get it. That reframing changed how I built everything.

We stopped treating error budgets as an abstraction. Every flow that touched a patient got an answer to one question: *if this fails silently, who gets hurt?* Payment flows could fail loudly and be retried. Consultation booking could not. That single question did more for our architecture than any design pattern.

## The stack matters less than the seams

Medsi ran on a boring stack: Node.js, a relational database, and a React Native app. What consumed 80% of my engineering time was none of those things. It was the seams: payment gateway webhooks arriving out of order, SMS delivery callbacks that never came, and video-consultation sessions that dropped and needed graceful rejoin.

Third-party integrations are where healthcare products actually break. If I could give one piece of advice to anyone building in this space: design your integration boundaries as if the other side is actively trying to confuse you, because functionally, it is.

## Small teams win on decision speed, not effort

We were a tiny team competing against funded players. We did not outwork them. We made decisions faster. A feature that took a funded competitor six weeks of alignment meetings took us a conversation and a deploy.

The engineering implication: keep the system simple enough that one person can hold the whole thing in their head. Every piece of infrastructure we added had to justify itself against the cost of one more thing to reason about during an incident. Most didn't make the cut.

## An acquisition is an engineering event

Nobody tells you this. When HelloWellness acquired Medsi, the diligence process went straight through the codebase, the data model, and the operational history. Clean data models, documented integrations, and an auditable payment trail directly affected the outcome.

If you are building a startup, your codebase is an asset that will one day be inspected by someone deciding what your company is worth. Build accordingly. It does not need to be gold-plated, but it must be *legible*.

## What carried forward

After the acquisition I stayed on as Lead Software Engineer and Architect at HelloWellness. When it merged into Allia Health Group, I moved into leading technical delivery across their healthcare product suite. The problems got bigger: live billing migrations, event-driven integration backbones, and multi-tenant mobile apps. The instincts are the same ones Medsi forced me to develop:

- Ask who gets hurt when a flow fails silently.
- Spend your complexity budget on the seams, not the core.
- Keep the system legible to one tired human at 2 AM.

Those lessons cost me two years of nights and weekends to learn. You can have them for free.

The next high-stakes problem was moving live healthcare subscriptions between billing systems. I wrote the practical playbook in [Zero-downtime subscription migration: WooCommerce to Stripe](/blog/zero-downtime-billing-migrations/).
