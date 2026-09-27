
# Profile Picture System — COMPLETE

Every Telegram account can have a profile picture.

## User features
- Add profile picture
- Change profile picture
- Remove profile picture
- Optional Telegram profile-photo sync
- Default avatar when no photo exists
- Profile visibility:
  - everyone
  - members
  - only_me

## Profile display
- Profile photo
- Username
- Telegram ID (only where permitted)
- Account status
- Premium status
- AI credit balance
- BDT wallet balance
- Join date

## Backend
`public.users` stores:
- `profile_photo_file_id`
- `profile_photo_url`
- `profile_photo_updated_at`
- `profile_visibility`

Telegram `file_id` is retained so the bot does not need to re-upload the same Telegram-hosted photo unnecessarily.

## Security
- User can update only their own profile.
- Profile-photo fields never control wallet, AI credits, premium, payment, or withdrawal.
- Private visibility must not expose the photo through another user's profile.
- Validate Telegram photo/file metadata before saving.
- Keep private storage/private URLs private.
- Admin may view profile information according to admin authorization.


# Profile Flow

## `/profile`
Show:
[Profile Photo]
Username
Account Status
Premium
AI Credits
Wallet

Buttons:
[Change Photo] [Remove Photo]
[Privacy: Everyone/Members only/Only me]
[Back]

## Change photo
1. User taps Change Photo.
2. Bot asks for a photo.
3. Accept Telegram photo message.
4. Select highest suitable `photo[]` size.
5. Save Telegram `file_id`.
6. Update `profile_photo_updated_at`.
7. Confirm success.

## Remove photo
1. User confirms.
2. Clear profile photo fields.
3. Keep account otherwise unchanged.

## Privacy
Only the owner can change their visibility.
Before displaying another user's profile, enforce:
- everyone: display
- members: display only to authorized bot members
- only_me: owner/admin only

## Important
Never use a client-supplied Telegram ID for profile mutation.
Use `ctx.from.id` as the authenticated Telegram identity.
