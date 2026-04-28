const EMAIL_ADDRESS = "hello@kwerkymedia.com";

const buildMailto = ({
  subject = "Kwerky Media project enquiry",
  body = "Hi Kwerky Media,%0D%0A%0D%0AI would like to discuss my project.%0D%0A%0D%0AName:%0D%0ACompany:%0D%0AProduct:%0D%0AChallenge:%0D%0A%0D%0AThanks,"
} = {}) => `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(subject)}&body=${body}`;

export { EMAIL_ADDRESS, buildMailto };
