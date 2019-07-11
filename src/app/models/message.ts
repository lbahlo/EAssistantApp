export class Message {
    sentBy: string;
    content: string;
    timestamp: Date;
    avatar: string;
    displayTimestamp: string;
    constructor(content: string, sentBy: string, avatar: string, timestamp?: Date) {
      this.sentBy = sentBy;
      this.content = content;
      this.timestamp = timestamp;
      this.avatar = avatar;
      this.displayTimestamp = this.formatDateTime(this.timestamp);
    }
    // 4:30PM
    formatCurrentTime(timestamp: Date) {
      const t = timestamp.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
      return(t);
    }

    formatFullTime(timestamp: Date) {
      const t = timestamp.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', second: '2-digit'});
      return(t);
    }
    formatDateTime(timestamp: Date) {
      const today = new Date();
      let day = today.getDate() + "";
      let month = (today.getMonth() + 1) + "";
      let year = today.getFullYear() + "";
      let hour = today.getHours() + "";
      let minutes = today.getMinutes() + "";
      let seconds = today.getSeconds() + "";

      day = this.checkZero(day);
      month = this.checkZero(month);
      year = this.checkZero(year);
      hour = this.checkZero(hour);
      minutes = this.checkZero(minutes);
      seconds = this.checkZero(seconds);

      // const t = day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds;

      const t = day + "/" + month + "/" + year + " • " +  this.formatFullTime(timestamp);
      return(t);
    }

    checkZero(data) {
      if (data.length === 1) {
        data = "0" + data;
      }
      return data;
    }
  }
