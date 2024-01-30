import axios from 'axios';

const handleSendNotification = async data => {
  try {
    const headers = {
      Authorization:
        'key=AAAA-N33sO8:APA91bGRy7SEPTKFE6DwRd-CCYohHcjbNPlszSCOXofz5_gQaZtCLcPvHdrmptHqqVvyZKlyGp9vF39AT8Xgu_KNBXlccfr4OHw_oQ2bc9PtkgM7ueS0fxYjgBHFU_8U7VqwpHVTVGpg',
    };

    let res = await axios.post('https://fcm.googleapis.com/fcm/send', data, {
      headers,
    });
    // console.log("Notification send successfully!", res);
  } catch (error) {
    console.log('Error on sending notification.', error);
  }
};

export default handleSendNotification;
