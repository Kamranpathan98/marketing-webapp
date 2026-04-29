# P2-T5 — Signup Flow

**Phase**: 2 — Conversion Infrastructure  
**Status**: [x] COMPLETE  
**Estimated effort**: 1 day  
**Depends on**: Nothing in Phase 2 — can be built standalone

---

## What This Is

The signup form and API route for new user registration.
Two fields only: email and password.
On success: redirect to /onboarding.

---

## Form Behavior

Fields:
- Email — type="email", required, auto-focused on mount
- Password — type="password", required, minLength=8

No name field. No phone field. No company field. No credit card field.
The form is intentionally minimal to reduce friction.

Validation (client-side, before submit):
- Email: must contain @ and . (browser native validation is sufficient)
- Password: minimum 8 characters
- Inline error messages appear below each field on blur if invalid

Submit button text: "Start free trial"
- Disabled while submitting
- Shows "Creating account..." while request is in flight

On success (201 from API):
- Redirect to /onboarding using Next.js router.push('/onboarding')

On error (409 — email already exists):
- Show error below email field: "An account with this email already exists. Sign in instead."
- "Sign in instead" is a link to /login

On error (500 or network failure):
- Show error below submit button: "Something went wrong. Please try again."

---

## API Route

File: `app/api/signup/route.ts`

POST handler:
- Parse body: { email: string, password: string }
- Validate: email required, password required + minLength 8
- For now: store in a JSON file at `data/users.json` (array of { email, passwordHash, createdAt })
- Hash password with bcrypt (10 rounds)
- Check for duplicate email — return 409 if exists
- On success: return 201 with { success: true }
- Never return the password or hash in the response

Validation errors: return 400 with { error: string }
Server errors: return 500 with { error: 'Internal server error' }

---

## /onboarding Page

This task only creates the route shell — not a full onboarding flow.
File: `app/onboarding/page.tsx`

Content for now:
- Heading: "Welcome to MyERP."
- Subheading: "Your account is ready. We'll set up your shop next."
- Single button: "Set up my shop" — placeholder, no action yet

This page will be fleshed out in a future task.

---

## Files to Create

- `components/signup/SignupForm.tsx` — Client Component
- `app/api/signup/route.ts` — API route
- `app/onboarding/page.tsx` — placeholder page
- `data/users.json` — initialized as empty array `[]`

---

## Acceptance Criteria

- [x] Form has exactly 2 fields: email and password
- [x] Email field is auto-focused on mount
- [x] Password field has minLength=8 client-side validation
- [x] Inline error shown below email field if invalid on blur
- [x] Inline error shown below password field if < 8 characters on blur
- [x] Submit button text is "Start free trial"
- [x] Submit button shows "Creating account..." while request is in-flight
- [x] Submit button is disabled while request is in-flight
- [x] On 201 response: redirects to /onboarding
- [x] On 409 response: shows "An account with this email already exists. Sign in instead." below email field
- [x] On 500/network error: shows "Something went wrong. Please try again." below submit button
- [x] API route file is at `app/api/signup/route.ts`
- [x] Password is hashed with bcrypt before storage (never stored in plaintext)
- [x] Duplicate email returns 409
- [x] Response body never contains password or hash
- [x] `data/users.json` exists and is initialized as `[]`
- [x] /onboarding page exists with correct heading copy
- [x] `npx tsc --noEmit` passes with 0 errors
