<template>
    <div>
        <div class="mapouter">
            <div class="gmap_canvas">
                <iframe
                        frameborder="0"
                        height="100%"
                        id="gmap_canvas"
                        marginheight="0"
                        marginwidth="0"
                        scrolling="no"
                        src="https://maps.google.com/maps?q=google&t=&z=13&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                />
            </div>
        </div>
    </div>
</template>

<style>
    .mapouter {
        text-align: right;
        height: 100%;
        width: 100%;
        position: absolute;
    }

    .gmap_canvas {
        overflow: hidden;
        background: none !important;
        height: 100%;
        width: 100%;
    }
</style>
