import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from '@react-email/components';
import * as React from 'react';

interface MeetingConfirmationProps {
  name: string;
  preferredDate: string;
  preferredTime: string;
  meetingType: string;
}

export const MeetingConfirmation = ({
  name,
  preferredDate,
  preferredTime,
  meetingType,
}: MeetingConfirmationProps) => {
  const firstName = name.split(' ')[0];

  return (
    <Html>
      <Head />
      <Preview>Potwierdzenie spotkania z WhiteSlope</Preview>
      <Body style={main}>
        <Container style={container}>
          
          {/* Header with wave emoji */}
          <Section style={header}>
            <Text style={waveEmoji}>👋</Text>
            <Heading style={heading}>Witaj {firstName}!</Heading>
          </Section>

          {/* Main content */}
          <Section style={section}>
            <Text style={text}>
              Dziękujemy za umówienie spotkania z <strong>WhiteSlope</strong>.
            </Text>

            <Section style={infoBox}>
              <Heading as="h3" style={boxHeading}>
                📋 Otrzymaliśmy Twoje zgłoszenie:
              </Heading>
              <Text style={infoText}>
                📅 <strong>Preferowana data:</strong> {preferredDate}
              </Text>
              <Text style={infoText}>
                🕐 <strong>Preferowana godzina:</strong> {preferredTime}
              </Text>
              <Text style={infoText}>
                💻 <strong>Rodzaj spotkania:</strong> {meetingType}
              </Text>
            </Section>

            <Text style={text}>
              Skontaktujemy się z Tobą w ciągu <strong>24 godzin</strong>, 
              aby potwierdzić szczegóły spotkania.
            </Text>

            <Section style={buttonContainer}>
              <Button style={button} href="https://whiteslope.studio/contact">
                Zobacz nasze usługi
              </Button>
            </Section>
          </Section>

          <Hr style={hr} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerHeading}>Zespół WhiteSlope</Text>
            <Text style={footerText}>
              📧 kontakt@whiteslope.studio
              <br />
              📞 +48 123 456 789
            </Text>
            <Text style={footerSubtext}>
              Białystok, Polska
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default MeetingConfirmation;

// ==========================================
// 🎨 STYLES
// ==========================================

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
  borderRadius: '8px',
};

const header = {
  backgroundColor: '#000000',
  padding: '40px 48px',
  textAlign: 'center' as const,
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
};

const waveEmoji = {
  fontSize: '48px',
  margin: '0 0 16px 0',
  textAlign: 'center' as const,
};

const heading = {
  fontSize: '32px',
  fontWeight: 'bold',
  color: '#ffffff',
  margin: '0',
};

const section = {
  padding: '32px 48px',
};

const text = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#374151',
  margin: '16px 0',
};

const infoBox = {
  backgroundColor: '#dbeafe',
  border: '2px solid #3b82f6',
  borderRadius: '12px',
  padding: '24px',
  margin: '24px 0',
};

const boxHeading = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#1e40af',
  margin: '0 0 16px 0',
};

const infoText = {
  fontSize: '15px',
  lineHeight: '24px',
  color: '#1f2937',
  margin: '8px 0',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#000000',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 32px',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '0',
};

const footer = {
  padding: '32px 48px',
  textAlign: 'center' as const,
  backgroundColor: '#f9fafb',
  borderBottomLeftRadius: '8px',
  borderBottomRightRadius: '8px',
};

const footerHeading = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#111827',
  margin: '0 0 8px 0',
};

const footerText = {
  fontSize: '14px',
  lineHeight: '22px',
  color: '#6b7280',
  margin: '8px 0',
};

const footerSubtext = {
  fontSize: '13px',
  color: '#9ca3af',
  margin: '8px 0 0 0',
};