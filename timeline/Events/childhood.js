import {TLEvent, TLDate, TLText, TLMedia} from "../event.js"

export class Childhood{
    constructor(){
        Object.assign(this, new TLEvent(
            new TLDate(
                2013
            ),
            new TLText(
                "Childhood",
                "By age 5, I was obsessed with computers, and loved games including Unreal Tournament 1999, and the original Command & Conquer (and if anyone wants to play some UT, hit me up). On the recommendation of an amazing IT teacher, I started to experiment with game maker and its programming language. I was bad at it, but I still managed to make some pretty enjoyable games."
            ),
            new TLMedia(
                "/motherlymuppet.github.io/resources/jpmorgan.jpg",
                "A 17-year-old me, looking unenthusiastic at the prospect of a job in investment banking."
            )
        ))
    }
}