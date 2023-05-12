from pydantic import BaseModel


class SendOtp(BaseModel):
    phone_number: str


class SendOtpResponse(BaseModel):
    verification_sid: str


class CheckOtpStatus(BaseModel):
    otp: str
    verification_sid: str


class CheckOtpStatusResponse(BaseModel):
    status: str
