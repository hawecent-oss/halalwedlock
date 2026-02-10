# n8n Automation Guide: Hawescent Notifications

To complete the "System in a Box," you need to set up an n8n workflow that listens for the webhooks we just integrated.

## 1. Create a Webhook Node
- **HTTP Method**: POST
- **Path**: `hawescent-events`
- **Response Mode**: Respond to Webhook (Status 200)

## 2. Add an IF Node (Event Routing)
Route the workflow based on the `type` field in the payload:
- **Condition 1**: `{{ $json.type }} == "registration"` 
  - -> Send Welcome Message (WhatsApp/Email)
  - -> Alert Admin of New User
- **Condition 2**: `{{ $json.type }} == "status_update"`
  - -> If `approved`: Send "You're Verified" message.
  - -> If `rejected`: Send "Needs Modification" message.

## 3. Sample WhatsApp Payload (Twilio/Evolution API)
```json
{
  "to": "{{ $json.payload.phone }}",
  "message": "Assalamu Alaikum {{ $json.payload.fullName }},\n\nWelcome to Hawescent. Your registration for a Halal marriage search has been received and is currently under review by our team."
}
```

## 4. Environment Setup
Don't forget to update your `.env` file with the final n8n Webhook URL:
`VITE_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/hawescent-events`
