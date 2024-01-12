import axios from 'axios';

export class ZoomService {
  public zoom = async (topic: string, startTime: string) => {
    try {
      const token = await this.generateToken();
      const response = await axios.post(
        'https://api.zoom.us/v2/users/me/meetings',
        {
          settings: {
            warning_room: false,
            join_before_host: true,
          },
          topic: topic,
          timezone: 'Asia/Astana',
          start_time: startTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data.join_url;
    } catch (e) {
      throw new Error('Ошибка при генерации ссылки.');
    }
  };

  private generateToken = async () => {
    try {
      const accountID = 'xy1GVNwrRKCqrod5YblHtQ';
      const clientID = 'iOdgmuNMRlSOZbdJW1uwQ';
      const clientSecret = 'ron98u7l98aGxcsNPfTxCnKZljLVFnNH';
      const data = `${clientID}:${clientSecret}`;
      const token = Buffer.from(data).toString('base64');

      const response = await axios.post(
        `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${accountID}`,
        {},
        {
          headers: {
            authorization: `Basic ${token}`,
          },
        },
      );
      return response.data.access_token;
    } catch (error) {
      throw new Error('Ошибка при генерации токена.');
    }
  };
}
