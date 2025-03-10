from fastapi import FastAPI, Request

app = FastAPI()

@app.post("/webhook/")
async def telegram_webhook(request: Request):
    data = await request.json()
    # Process Telegram bot updates
    return {"status": "ok"}
