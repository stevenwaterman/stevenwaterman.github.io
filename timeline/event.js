export class Timeline {
    constructor(title, events){
        this.title = title;
        this.events = events;
    }
}

export class TLEvent {
    constructor(start_date, text, media) {
        this.start_date = start_date;
        this.text = text;
        this.media = media;
    }
}

export class TLDate{
    constructor(year, month, day){
        this.year = year;
        this.month = month;
        this.day = day;
        this.display_date = "yyyy mmm";
    }
}

export class TLText{
    constructor(headline, text){
        this.headline = headline;
        this.text = text;
    }
}

export class TLMedia{
    constructor(url, caption, thumbnail){
        this.url = url;
        this.caption = caption;
        this.thumbnail = thumbnail;
    }
}