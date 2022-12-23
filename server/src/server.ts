import Express from "express"
import cors from "cors" 

import { PrismaClient } from "@prisma/client"
import { convertHoursToMinutes } from "./utils/convert-hours";
import { convertMinutesForHours } from "./utils/convert-minutes-for-hours";

const app = Express();


app.use(Express.json())
app.use(cors())


const prisma = new PrismaClient();

app.get('/games', async (request, response) => {
    const games = await prisma.game.findMany({
        include: { 
            _count: {
                select: {
                    ads: true
                }
            }
        }
    });
    return response.json(games);
});

app.post('/games', async (request, response) => {
    const body: any = request.body;

    const game = await prisma.game.create({
        data: {
            title: body.title,
            bannerUrl: body.bannerUrl,
        }
    });
});



app.post('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;
    const body: any = request.body;


    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekdays: body.weekdays.join(','),
            hoursStart: convertHoursToMinutes(body.hoursStart),
            hoursEnd: convertHoursToMinutes(body.hoursEnd),
            useVoiceChannel: body.useVoiceChannel,
        }
    });


    return response.status(201).json(ad);
});

app.get("/games/:id/ads", async (request, response) => {
    const gameId = request.params.id;

    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            yearsPlaying : true,
            weekdays: true,
            hoursStart: true,
            hoursEnd : true,
            useVoiceChannel: true,
        },
        where: {
            gameId
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    response.json(ads.map(ad => ({
        ...ad,
        weekdays: ad.weekdays.split(","),
        hoursStart: convertMinutesForHours(ad.hoursStart),
        hoursEnd: convertMinutesForHours(ad.hoursEnd),
        })));
});

app.get("/ads/:id/discord", async(request, response) => {
    const adId = request.params.id;
    
    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true
        },
        where: {
            id: adId
        }
    });
    
    return response.json(
        {
            discord: ad.discord,
        }
    );
});

app.listen(3030, () => {
    console.log("Server started");
    console.log("Listening on port http://localhost:3030/");
});