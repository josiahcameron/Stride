from django.test import TestCase
from twilio.rest import Client
from django.conf import settings


# Create your tests here.

# This function uses the Twilio Python library to create a new Client instance, and then sends an SMS message using the messages.create() method.
# The function takes two parameters: to_number(the phone number of the recipient) and body(the message to be sent).
def send_sms(to_number, body):
    client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
    message = client.messages.create(
        to=to_number,
        from_=settings.TWILIO_PHONE_NUMBER,
        body=body
    )
    return message.sid


send_sms(18436173957, "test")
