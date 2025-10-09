import {
  Body,
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

interface MeetingEmailProps {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  preferredDate: string;
  preferredTime: string;
  meetingType: string;
  topic: string;
}

export const MeetingEmail = ({
  name,
  email,
  phone,
  company,
  preferredDate,
  preferredTime,
  meetingType,
  topic,
}: MeetingEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Nowe zapytanie o spotkanie od {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          
          {/* Header */}
          <Section style={header}>
            <Heading style={heading}>📅 Nowe zapytanie o spotkanie</Heading>
          </Section>

          {/* Contact Info */}
          <Section style={section}>
            <Heading as="h2" style={subheading}>
              Dane kontaktowe
            </Heading>
            <Text style={text}>
              <strong>Imię i nazwisko:</strong> {name}
            </Text>
            <Text style={text}>
              <strong>Email:</strong> {email}
            </Text>
            {phone && (
              <Text style={text}>
                <strong>Telefon:</strong> {phone}
              </Text>
            )}
            {company && (
              <Text style={text}>
                <strong>Firma:</strong> {company}
              </Text>
            )}
          </Section>

          <Hr style={hr} />

          {/* Meeting Details */}
          <Section style={section}>
            <Heading as="h2" style={subheading}>
              Szczegóły spotkania
            </Heading>
            <Section style={detailBox}>
              <Text style={detailText}>
                <strong>📅 Preferowana data:</strong> {preferredDate}
              </Text>
              <Text style={detailText}>
                <strong>🕐 Preferowana godzina:</strong> {preferredTime}
              </Text>
              <Text style={detailText}>
                <strong>💻 Rodzaj spotkania:</strong> {meetingType}
              </Text>
            </Section>
          </Section>

          <Hr style={hr} />

          {/* Topic */}
          <Section style={section}>
            <Heading as="h2" style={subheading}>
              Temat spotkania
            </Heading>
            <Section style={topicBox}>
              <Text style={topicText}>{topic}</Text>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              WhiteSlope Studio
              <br />
              kontakt@whiteslope.studio
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default MeetingEmail;

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
};

const header = {
  backgroundColor: '#000000',
  padding: '32px 48px',
  textAlign: 'center' as const,
};

const heading = {
  fontSize: '28px',
  fontWeight: 'bold',
  color: '#ffffff',
  margin: '0',
};

const section = {
  padding: '24px 48px',
};

const subheading = {
  fontSize: '20px',
  fontWeight: '600',
  color: '#000000',
  margin: '0 0 16px 0',
};

const text = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#525252',
  margin: '8px 0',
};

const detailBox = {
  backgroundColor: '#f3f4f6',
  borderRadius: '8px',
  padding: '16px',
  marginTop: '12px',
};

const detailText = {
  fontSize: '15px',
  lineHeight: '22px',
  color: '#1f2937',
  margin: '8px 0',
};

const topicBox = {
  backgroundColor: '#fef3c7',
  border: '2px solid #fbbf24',
  borderRadius: '8px',
  padding: '20px',
  marginTop: '12px',
};

const topicText = {
  fontSize: '15px',
  lineHeight: '24px',
  color: '#1f2937',
  margin: '0',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '24px 0',
};

const footer = {
  padding: '24px 48px',
  textAlign: 'center' as const,
};

const footerText = {
  fontSize: '14px',
  lineHeight: '20px',
  color: '#9ca3af',
  margin: '0',
};