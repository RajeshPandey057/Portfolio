import {
	bigint,
	bigserial,
	date,
	integer,
	jsonb,
	numeric,
	pgEnum,
	pgTable,
	smallint,
	smallserial,
	text,
	timestamp,
	uniqueIndex
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';
import { sql } from 'drizzle-orm/sql/sql';

export const questionTypes = pgEnum('type', [
	'rate',
	'yesNo',
	'upload',
	'description',
	'singleOption',
	'optionalUpload',
	'multipleOption'
]);
export const appointmentStatus = pgEnum('status', [
	'paid',
	'scheduled',
	'accepted',
	'ongoing',
	'completed',
	'refunded',
	'rescheduled'
]);
export const user = pgTable('user', {
	id: bigserial('id', { mode: 'bigint' }).primaryKey(),
	uuid: text('uuid').notNull().unique(),
	firstName: text('first_name'),
	lastName: text('last_name'),
	status: text('status'),
	lang: text('lang'),
	email: text('email'),
	phone: text('phone'),
	dpLink: text('dp_link'),
	roomId: text('room_id'),
	docCode: text('doc_code'),
	wait_code: text('wait_code'),
	verified: integer('verified').default(0),
	authProviders: text('auth_providers').array(),
	extra: jsonb('extra').$type<{
		height?: string;
		weight?: string;
		bloodPressure?: string;
	}>(),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'date'
	}).defaultNow(),
	updatedAt: timestamp('updated_at', {
		withTimezone: true,
		mode: 'date'
	}).$onUpdate(() => new Date())
});

export const userDetail = pgTable('user_detail', {
	userId: bigint('user_id', { mode: 'bigint' })
		.references(() => user.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade'
		})
		.primaryKey(),

	bp: text('bp'),
	extra: jsonb('extra'),
	gender: text('gender'),
	height: numeric('height'),
	weight: numeric('weight'),
	pastBP: text('past_bp').array(),
	dob: date('dob', { mode: 'date' }),
	pastWeight: numeric('past_weight').array(),
	questionnaire: jsonb('questionnaire').$type<
		{
			question: string;
			answer?: string;
			type?: string;
		}[]
	>(),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'date'
	}).defaultNow(),
	updatedAt: timestamp('updated_at', {
		withTimezone: true,
		mode: 'date'
	}).$onUpdate(() => new Date())
});

export const partner = pgTable('partner', {
	id: bigserial('id', { mode: 'bigint' }).primaryKey(),
	uuid: text('uuid').notNull(),
	firstName: text('first_name'),
	lastName: text('last_name'),
	email: text('email'),
	phone: text('phone'),
	status: text('status'),
	lang: text('lang'),
	tags: text('tags').array(),
	specialty: text('specialty'),
	dob: date('dob', { mode: 'date' }),
	licenseNumber: text('license_number'),
	dpLink: text('dp_link'),
	stampLink: text('stamp_link'),
	signatureLink: text('signature_link'),
	averageRating: numeric('average_rating'),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'date'
	}).defaultNow(),
	updatedAt: timestamp('updated_at', {
		withTimezone: true,
		mode: 'date'
	}).$onUpdate(() => new Date())
});

export const question = pgTable('questions', {
	id: smallserial('id').primaryKey(),
	type: questionTypes('type'),
	category: text('category'),
	question: text('question'),
	nextId: smallint('next_id'),
	metadata: jsonb('metadata'),
	options: text('options')
		.array()
		.notNull()
		.default(sql`ARRAY[]::text[]`),
	routes: jsonb('routes')
});

export const appointment = pgTable('appointment', {
	id: bigserial('id', { mode: 'bigint' }).primaryKey(),
	status: appointmentStatus('status'),
	userId: bigint('user_id', { mode: 'bigint' })
		.references(() => user.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade'
		})
		.notNull(),
	preferredSlot: timestamp('preferred_slot', {
		withTimezone: true,
		mode: 'date'
	}),
	paymentId: text('payment_id').references(() => payment.id, {
		onDelete: 'set null',
		onUpdate: 'cascade'
	}),
	actualSlot: timestamp('actual_slot', { withTimezone: true, mode: 'date' }),
	partnerId: bigint('partner_id', { mode: 'bigint' }).references(() => partner.id),
	rating: numeric('rating'),
	review: text('review'),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'date'
	}).defaultNow(),
	updatedAt: timestamp('updated_at', {
		withTimezone: true,
		mode: 'date'
	}).$onUpdate(() => new Date())
});

export const appointmentSummary = pgTable(
	'appointment_summary',
	{
		appointmentId: bigint('appointment_id', { mode: 'bigint' })
			.references(() => appointment.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade'
			})
			.primaryKey(),
		note: text('note'),
		refer: text('refer'),
		medicine: jsonb('medicine'),
		observation: text('observation'),
		labPrescribed: jsonb('lab_prescribed'),
		createdAt: timestamp('created_at', {
			withTimezone: true,
			mode: 'date'
		}).defaultNow(),
		updatedAt: timestamp('updated_at', {
			withTimezone: true,
			mode: 'date'
		}).$onUpdate(() => new Date()),
		followUp: timestamp('follow_up', { withTimezone: true, mode: 'date' })
	},
	(table) => ({
		appointmentId: uniqueIndex('doctor_responses_appointment_id').on(table.appointmentId)
	})
);

export const payment = pgTable('payment', {
	id: text('id').primaryKey(),
	status: text('status'),
	gateway: text('gateway'),
	currency: text('currency'),
	metadata: jsonb('metadata'),
	invoiceId: text('invoice_id'),
	paymentMethod: text('payment_method'),
	amount: bigint('amount', { mode: 'bigint' }),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'date'
	}).defaultNow(),
	updatedAt: timestamp('updated_at', {
		withTimezone: true,
		mode: 'date'
	}).$onUpdate(() => new Date())
});

export const order = pgTable('order', {
	id: bigserial('id', { mode: 'bigint' }).primaryKey(),
	item: text('item'),
	extId: text('ext_id'),
	status: text('status'),
	carrier: text('carrier'),
	provider: text('provider'),
	inTrackingNo: text('in_tracking_no'),
	outTrackingNo: text('out_tracking_no'),
	shippingMethod: text('shipping_method'),

	userId: bigint('user_id', { mode: 'bigint' })
		.references(() => user.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade'
		})
		.notNull(),
	paymentId: text('payment_id').references(() => payment.id, {
		onDelete: 'set null',
		onUpdate: 'cascade'
	}),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'date'
	}).defaultNow(),
	updatedAt: timestamp('updated_at', {
		withTimezone: true,
		mode: 'date'
	}).$onUpdate(() => new Date())
});

export const userRelations = relations(user, ({ one }) => ({
	userDetail: one(userDetail, {
		fields: [user.id],
		references: [userDetail.userId]
	})
}));
export const appointmentRelations = relations(appointment, ({ one }) => ({
	user: one(user, {
		references: [user.id],
		fields: [appointment.userId]
	}),
	partner: one(partner, {
		references: [partner.id],
		fields: [appointment.partnerId]
	}),
	payment: one(payment, {
		references: [payment.id],
		fields: [appointment.paymentId]
	}),
	appointmentSummary: one(appointmentSummary, {
		references: [appointmentSummary.appointmentId],
		fields: [appointment.id]
	})
}));

export const orderRelations = relations(order, ({ one }) => ({
	user: one(user, { references: [user.id], fields: [order.userId] }),
	payment: one(payment, {
		references: [payment.id],
		fields: [order.paymentId]
	})
}));

export type UserType = typeof user.$inferSelect;
export type QuestionType = typeof question.$inferSelect;
export type QuestionTypes = typeof questionTypes.enumValues;
