//HELPER FUNCTIONS

// Set cookie
window.sc = function(tag, value, days) {
    console.log('[functions|SetCookie] Cookie set:', tag, '→', decodeURIComponent(value), days);
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    const cookieValue = `${encodeURIComponent(tag)}=${encodeURIComponent(value)};expires=${expirationDate.toUTCString()};path=/`;
    document.cookie = cookieValue;
}
// Get cookie
window.gc = function(tag) {
    const value = document.cookie.split('; ').find(row => row.startsWith(tag + '='))?.split('=')[1];
    return value;
}


// STORE SELECTED QUERY PARAMS AS COOKIES
// ((NEED TO SET UP USER CONSENT FIRST))

function storeQueryParams(keys, days) {
    console.log("[functions|SetQueryParams] Starting...");
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.forEach((value, key) => {
        const isTracked = keys.includes(key);
        if (isTracked) {
            if (!gc(key)) {sc(key, value, days)}
            else {console.log(`Cookie already exists: ${key}`)}
        }
    });
    console.log("[functions|SetQueryParams] End");
    console.log("--------------");
}
storeQueryParams([
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content"
    ], 90
);


// SET TRAFFIC SOURCE COOKIES
// ((NEED TO SET UP USER CONSENT FIRST))

function storeTrafficSource(days) {
    console.log("[functions|SetTrafficSource] Starting...");
    const utm = gc("utm_source");
    let ref = document.referrer ? document.referrer.replace(/^https?:\/\/(www\.)?/i, '').split('/')[0] : '';
    let source = utm || (ref && ref !== 'zelt.app' ? ref : '');
    if (!gc("source_first") && source) {sc("source_first", source, days)}
    if ( gc("source_first") && source) {sc("source_last", source, days)}
    document.dispatchEvent(new Event('cookiesSet'));
    console.log("[functions|SetTrafficSource] End");
    console.log("--------------");


}
storeTrafficSource(90);



// POPULATE HUBSPOT FORM WITH COOKIES
function populateHubspotForm(form) {

    console.log("[functions|PopulateHsForm] Starting...");
    const populate = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "source_first",
      "source_last",
      "email",
    ];
    populate.forEach((query) => {
        const val = gc(query);
        if (val) {
            const decoded = decodeURIComponent(val);
            form.setFieldValue(`0-1/${query}`, decoded);
            console.log('[functions|PopulateHsForm] Form field populated:', query, '→', decoded);
        }
    });
    console.log("[functions|PopulateHsForm] End");
    console.log("--------------");
}

window.addEventListener("hs-form-event:on-ready", async (event) => {
    const form = HubSpotFormsV4.getFormFromEvent(event);
    if (form._zeltPopulated) {return;}
    form._zeltPopulated = true;
    console.log("[functions|PopulateHsForm] Trigger: hs-form-event:on-ready");
    populateHubspotForm(form);
    document.addEventListener("cookiesSet", () => {
        console.log("[functions|PopulateHsForm] Trigger: cookiesSet");
        populateHubspotForm(form);
    }, { once: true });
});



/* SCRIPT LAZY LOADING ((MOVED TO HTML HEAD))
let scriptsLoaded = false;
function loadScripts(triggeredBy) {

    if (scriptsLoaded) return;
    scriptsLoaded = true;
    console.log('[functions|LazyLoadScripts] Starting...');
    
    // GOOGLE TAG MANAGER
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    var f = document.getElementsByTagName('script')[0];
    var j = document.createElement('script');
    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-MQD88VB';
    f.parentNode.insertBefore(j, f);
    console.log('[functions|LazyLoadScripts] Script loaded: GTM-MQD88VB');
  
    ['scroll', 'pointermove', 'touchstart'].forEach(event => document.removeEventListener(event, eventMap[event]));
    console.log('[functions|LazyLoadScripts] End ');
    console.log("--------------");

    // SEND CUSTOM LOGIN EVENT TO GA WHEN USER CLICKS ON LOGIN
    const GA4_MEASUREMENT_ID = 'G-393QSTBEE1';
    const GA_TIMEOUT = 400;
    document.addEventListener('click', function(event) {
        const clickedElement = event.target.closest('a');
        if (!clickedElement) return;
        const clickText = clickedElement.textContent ? clickedElement.textContent.trim() : '';
        const clickURL = clickedElement.href || window.location.href;

        if (clickText === 'Login') {
            event.preventDefault();
            const navigate = () => window.location.href = clickURL;
            let didNavigate = false;
            const safeNavigate = () => {if (!didNavigate) {didNavigate = true;navigate();}};
            if (typeof gtag === 'function') {
                console.log('[functions|LazyLoadScripts] GA4 Event Fired: login_button_click');

                const timeoutId = setTimeout(() => {
                    console.warn('[functions|LazyLoadScripts] GA timeout reached. Navigating to Login.');
                    safeNavigate();
                }, GA_TIMEOUT);

                gtag('event', 'login_button_click', {
                    link_url: clickURL,
                    link_text: clickText,
                    send_to: GA4_MEASUREMENT_ID,
                    event_callback: () => {clearTimeout(timeoutId);safeNavigate();},
                    event_timeout: GA_TIMEOUT
                });

            } else {
                console.warn('[functions|LazyLoadScripts] GA4 (gtag) not loaded. Navigating to Login immediately.');
                navigate();
            }
        }
    });

}

const eventMap = {
    scroll: () => triggerIfReady('scroll'),
    pointermove: () => triggerIfReady('pointermove'),
    touchstart: () => triggerIfReady('touchstart'),
};
function triggerIfReady(eventType) {
    console.log("[functions|LazyLoadScripts] Trigger:", eventType);
    if (document.readyState === 'complete' || document.readyState === 'interactive') {loadScripts(eventType);}
    else {document.addEventListener('DOMContentLoaded', () => loadScripts(eventType), { once: true });}
}

['scroll', 'pointermove', 'touchstart'].forEach(event =>
    document.addEventListener(event, eventMap[event], { passive: true, once: true })
);

// Fallback: load after 1 seconds no matter what
setTimeout(() => {
    if (scriptsLoaded) return;
    console.log('[functions|LazyLoadScripts] Trigger: Timeout (2s)');
    loadScripts('timeout');
}, 1000);
*/

// DELAY HERO VIDEO LOAD UNTIL PAGE HAS LOADED (USED IN LANDING PAGE HEADER)
// (NEED TO ADD A GUARD FOR PAGES WHERE THERE IS NO VIDEO)
function setVideoSource() {

    console.log("[functions|SetVideoSource] Starting...");

    const video = document.getElementById("hero-video");
    const source = video.querySelector("source");

    console.log("[functions|SetVideoSource] Video detected:", video.id);
    if (!video)  {console.log("[functions|SetVideoSource] No video on this page"); return;}
    if (!source) {console.log("[functions|SetVideoSource] Error: No source found for video"); return;}
    console.log("[functions|SetVideoSource] Data-src detected:", source.dataset?.src);
    if (!source.dataset || !source.dataset.src) {console.log("[functions|SetVideoSource] Error: No data-src attribute found"); return;}

    // Set the real src and load the video
    console.log("[functions|SetVideoSource] Set video source to data-src");
    source.src = source.dataset.src;

    console.log("[functions|SetVideoSource] Loading video...");
    video.load();

    console.log("[functions|SetVideoSource] Set video to display, autoplay, mute and play inline");
    video.style.display = "block";
    video.autoplay = true;
    video.muted = true;
    video.playsInline = true;

    video.play()
        .then(() => {
            console.log("[functions|SetVideoSource] Video started playing")
            console.log("[functions|SetVideoSource] End");
            console.log("--------------");
        })
        .catch((err) => {
            console.log("[functions|SetVideoSource] Video play blocked or error:", err)
            console.log("[functions|SetVideoSource] End");
            console.log("--------------");
        });

    /* Hide the preview image if present (Not used anymore)
    const image = document.getElementById("hero-image");
    console.log("[functions|SetVideoSource] hero-image element:", image);

    if (image) {
        console.log("[functions|SetVideoSource] Hiding preview image");
        image.style.display = "none";
    }*/

}

document.addEventListener("DOMContentLoaded", () => {
    console.log("[functions|SetVideoSource] Trigger: DOMContentLoaded");
    setVideoSource();
});