const sendText = async (from, to, message) => {
  let baseUrl = process.env.REACT_APP_FUNCTION_BASE;
  let body = {
    to,
    from,
    body: message,
  };

  try {
    let response = await fetch(baseUrl + '/sms/sendSms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    let result = await response.json();
    console.log('Message sent successfully: ', result);
    trackAction('sms');
    return result;
  } catch (error) {
    console.log('Error sending video chat link', error);
    trackAction('smsError');
    return false;
  }
};

const sendEmail = async (to, subject, body) => {
  let baseUrl = process.env.REACT_APP_FUNCTION_BASE;
  let functionUrl = '/util-send-email?mode=HTML';
  functionUrl += '&html=' + encodeURIComponent(body);
  functionUrl += '&subject=' + encodeURIComponent(subject);
  functionUrl += `&toAddress=${encodeURIComponent(to)}`;

  try {
    let response = await fetch(baseUrl + functionUrl);
    let result = await response.json();
    console.log('sent email', result);
    trackAction('email');
    return result;
  } catch (err) {
    console.error(err);
    trackAction('emailError');
    return false;
  }
};

const trackAction = (action, traits, externalIds) => {
  if (!process.env.REACT_APP_SEGMENT_KEY) return;
  if (window.analytics) window.analytics.track(action, traits, { externalIds });
};

const identify = (userId, traits) => {
  if (!process.env.REACT_APP_SEGMENT_KEY) return;
  if (window.analytics) window.analytics.identify(userId, traits);
};

const createTask = async attributes => {
  let baseUrl = process.env.REACT_APP_FUNCTION_BASE;
  let serverlessUrl = '/taskRouter/createTask';

  try {
    let response = await fetch(baseUrl + serverlessUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        attributes: attributes,
      }),
    });

    let responseJson = await response.json();
    trackAction('task submitted');

    return responseJson;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export { sendText, sendEmail, trackAction, createTask, identify };
