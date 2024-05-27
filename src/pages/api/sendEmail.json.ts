import type { APIRoute } from "astro";
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);


export const POST: APIRoute = async({ params, request }) => {
    const body = await request.json();
    const { to, from, html, subject, text} = body;
    console.log({ to, from, html, subject, text});

    if( !to || !from || !html || !subject || !text ){
        return new Response(null, {
            status: 404,
            statusText: 'Did not provide the right data'
        });
    }else{
        try{
            const res = await resend.emails.send({
                from: "onboarding@resend.dev",
                to: 'joelbenitezdonari@gmail.com',
                subject: subject,
                html: html+ ` user email: ${from}`,
                text: text
            });
            //const data = await res.json();
            //console.log(data);
        }catch(e){
            console.log(e);
        }
    }

    return new Response(
        JSON.stringify({
            name: 'Astro',
            url: "http://astro.build/"
        })
    );
}