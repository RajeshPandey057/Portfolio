---
title: 'Zero-downtime subscription migration: WooCommerce to Stripe'
seoTitle: 'WooCommerce to Stripe subscription migration'
description: 'A practical playbook for moving active subscriptions from WooCommerce to Stripe using historical backfills, idempotent writes, cohort cutovers, and continuous reconciliation.'
pubDate: 'Jul 9 2026'
updatedDate: 'Jul 30 2026'
heroImage: '../../assets/billing-migration-cover.png'
heroImageAlt: 'Two billing systems connected by a continuous coral transfer path'
tags: ['payments', 'migrations', 'backend', 'healthcare']
takeaways:
  - 'Keep the legacy system authoritative until a parallel run proves the new system is correct.'
  - 'Backfill history and preserve stable cross-references instead of migrating only current state.'
  - 'Use cohort cutovers, idempotent writes, and continuous reconciliation to make cutover day boring.'
---

One of the highest-stakes projects I have led was migrating live e-commerce orders and subscriptions from WooCommerce onto Stripe billing. For this healthcare product, a missed renewal could mean a patient's medication subscription lapses. Nobody could see an interruption. Not one customer.

This post is the playbook I wish I'd had at the start. The patterns generalize to any live billing migration, whatever the systems involved.

## Rule zero: the old system stays authoritative until proven otherwise

The single biggest mistake in billing migrations is flipping authority too early. Until the moment of cutover, the legacy system remains the source of truth, and the new system is a shadow being validated against it.

That means running both in parallel and comparing outputs, not for a day but for full billing cycles. Subscriptions have temporal behavior that only shows up when a renewal actually fires. A migration validated only against static data will pass every test and then fail on the first renewal that hits an edge case: a paused subscription, a mid-cycle plan change, or a card that expired during the migration window.

## Backfill history, don't just port state

It is tempting to migrate only current state: active subscriptions, current plans, and next billing dates. Resist it. Support teams, refund flows, and dispute processes all reach into history. If a customer disputes a charge from four months before the migration, someone needs to trace it in the new system.

Our approach was to backfill historical orders as first-class records in the new system, linked to their originals with a stable cross-reference ID. That last part matters more than it looks. During the messy weeks after cutover, the ability to hop from a record in the new system to its ancestor in the old one turns a support nightmare into a lookup.

## Active-order linking is the hard part

Historical backfills are mechanical. The genuinely hard problem is *active* subscriptions: an order that exists in the old system, has a renewal scheduled, and must come alive in the new system at the right moment with the right state.

The pattern that worked:

1. **Freeze windows, per cohort.** Never migrate everything at once. Slice by renewal date and migrate each cohort during its quietest window, right after a renewal fires, when the subscription has the longest runway before the next event.
2. **Idempotent creation.** Every migration script must be safe to run twice. Partial failures *will* happen, and the recovery path should be "run it again," not an archaeological dig.
3. **Suppress, then verify, then release.** After creating the subscription in the new system, the old one does not get deleted. It gets suppressed (renewals disabled) and retained as evidence. Deleting the fallback before validating the replacement is how you turn a bug into an outage.

## Reconciliation is a permanent fixture, not a phase

We built a reconciliation job that compared the two systems continuously: every active subscription, its next billing date, its amount, and its payment method status. Any divergence raised a flag before the customer's renewal date arrived. That converts silent billing failures into tickets you handle proactively.

My rule of thumb: the reconciliation tooling should outlive the migration by at least one full billing cycle of every plan you offer. Annual plans mean a year.

## The cutover should be boring

If the parallel run is validated, the backfills are linked, and reconciliation is green, then cutover day is a non-event: a configuration change, not a launch. That is the goal. The drama budget for a billing migration should be spent entirely in the preparation, so the moment itself has none left.

Ours was boring. The patients never knew. That's what success looks like in this kind of work: nothing visible happened at all.

The reliability instincts behind this migration started much earlier. Read [Building a telehealth startup: 5 engineering lessons from Medsi](/blog/building-and-selling-a-telehealth-startup/) for the product and architecture lessons that carried forward.
