// src/lib/validateCaptcha.ts
export async function validateCaptchaToken(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY!;
  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify`;

  try {
    const response = await fetch(verificationUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error("CAPTCHA validation error:", error);
    return false;
  }
}
