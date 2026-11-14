import { calendar_v3 } from '@googleapis/calendar';
import { OAuth2Client } from 'google-auth-library';
import { env } from '$env/dynamic/private';

function getOAuthConfig() {
  const clientId = env.GOOGLE_CLIENT_ID;
  const clientSecret = env.GOOGLE_CLIENT_SECRET;
  const redirectUri = env.GOOGLE_REDIRECT_URI;
  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error('Google OAuth is not configured on the server.');
  }
  return { clientId, clientSecret, redirectUri };
}

export async function createCalendarEvent(accessToken: string, event: any) {
  const oauth2Client = new OAuth2Client(getOAuthConfig());

  oauth2Client.setCredentials({ access_token: accessToken });
  const calendar = new calendar_v3.Calendar({ auth: oauth2Client });

  try {
    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: {
        summary: event.summary,
        description: event.description,
        start: {
          dateTime: event.startDateTime,
          timeZone: event.timeZone || 'UTC',
        },
        end: {
          dateTime: event.endDateTime,
          timeZone: event.timeZone || 'UTC',
        },
        attendees: event.attendees?.map((email: string) => ({ email })),
        reminders: {
          useDefault: true,
        },
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error creating calendar event:', error);
    throw error;
  }
}

export async function listCalendarEvents(accessToken: string, timeMin: string, timeMax: string) {
  const oauth2Client = new OAuth2Client(getOAuthConfig());

  oauth2Client.setCredentials({ access_token: accessToken });
  const calendar = new calendar_v3.Calendar({ auth: oauth2Client });

  try {
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin,
      timeMax,
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });

    return response.data.items || [];
  } catch (error) {
    console.error('Error listing calendar events:', error);
    throw error;
  }
}
