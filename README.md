# ARFAN AI HUB — V1 → CURRENT COMPLETE BUILD PACK

## Locked product rules
- Admin: Telegram ID `6386740978`
- Payment/support number: `01316963411`
- Support: `@Arfanvai11`
- 10 AI tools
- AI credits are utility-only and never withdrawable
- New account starts inactive
- Verified purchase of any valid plan => Lifetime Active
- Plan expiry affects plan benefits only
- Daily bonus: Login 3 + Quiz 3 + Task 3 = 9/day
- Payment requires TRX ID + screenshot
- Telegram ID is captured automatically
- Duplicate normalized TRX is blocked
- Bot/support evidence may match, but Admin Verify is final
- Verify grants plan + credits exactly once
- Reject grants nothing
- Admin/AI/user financial authorities are separated

## Production status
This pack is the complete application architecture and hardened database contract reconstructed from the conversation. Provider-specific adapters are isolated behind server-side interfaces. Do not publish until each provider adapter is configured with a valid official API/key and end-to-end QA passes.

## Start
1. Copy `.env.example` to Vercel Environment Variables.
2. Run `supabase/schema.sql`.
3. Deploy the `/api` functions.
4. Configure Telegram webhook with secret token.
5. Run tests/QA checklist.

## Final production gate
The repository contains the backend architecture and hardened database layer, but it is not truthful to call provider integrations or live payment verification production-ready until real credentials are installed and end-to-end tests pass. Current provider documentation confirms APIs exist for OpenAI, Leonardo, Gamma, Runway, ElevenLabs, remove.bg, Ideogram, Otter (Enterprise public API), ChatPDF, and Upscale.media; access/plan requirements vary by provider. Do not commit secrets.
