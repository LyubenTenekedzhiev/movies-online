### FooNetflixBar

FooNetflixBar is a HLS video streaming platform. There is a wide variety of movies and series, suitable for the whole family. The unique trailer selection (one hard-coded video with shaka player) will help you with your choice!

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Usage

Install the dependencies.

### `yarn/npm install`

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

You will also see any lint errors in the console.

## CORS

All HLS resources must be delivered with [CORS headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) permitting GET requests.

## Supported M3U8 tags

* #EXTM3U
* #EXTINF
* #EXT-X-STREAM-INF (adaptive streaming)
*#EXT-X-ENDLIST (Live playlist)
*#EXT-X-MEDIA-SEQUENCE
*#EXT-X-TARGETDURATION
#EXT-X-DISCONTINUITY
#EXT-X-DISCONTINUITY-SEQUENCE
#EXT-X-BYTERANGE
#EXT-X-MAP
#EXT-X-KEY [(https://tools.ietf.org/html/draft-pantos-http-live-streaming-08#section-3.4.4)]
#EXT-X-PROGRAM-DATE-TIME [(https://tools.ietf.org/html/draft-pantos-http-live-streaming-18#section-4.3.2.6)]
EXT-X-START:TIME-OFFSET=x [(https://tools.ietf.org/html/draft-pantos-http-live-streaming-18#section-4.3.5.2)]

## Contributing

Any constructive criticism/feedback is welcome!
