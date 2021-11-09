<script>
    import { defaultCleanResult } from './../constants/defaults.js';
    import { Tooltip, Toast, ToastBody, ToastHeader, Icon } from 'sveltestrap';

    // props
    export let cleanResult = {
        ...defaultCleanResult,
    };
    export const onReset = () => {
        copiedToClipboard = false;
        showClipboardMessage = false;
        console.log('resetting');
    };

    // state
    let copiedToClipboard = false;
    let showClipboardMessage = false;

    // handlers
    async function handleCopyToClipboard() {
        const permissions = await navigator.permissions.query({
            name: 'clipboard-write',
        });
        if (permissions.state === 'granted' || permissions.state === 'prompt') {
            navigator.clipboard.writeText(cleanResult.result);
            copiedToClipboard = true;
            showClipboardMessage = true;
            setTimeout(() => (showClipboardMessage = false), 2000);
        }
    }

    // reactive variables
    $: statusType = cleanResult.cleaned ? 'success' : 'danger';
    $: headerIcon = cleanResult.cleaned
        ? 'check-circle-fill'
        : 'exclamation-circle-fill';
    $: headerMessage = cleanResult.cleaned ? 'success!' : `it didn't work`;
    $: clipboardIcon = copiedToClipboard ? 'clipboard-check' : 'clipboard-plus';
</script>

<div class="row m-0 mt-3">
    <div class="col-12 text-center text-light">
        <Toast class="bg-dark w-100">
            <ToastHeader
                class={`bg-dark text-light rounded-top border border-${statusType}`}
            >
                <Icon
                    slot="icon"
                    name={headerIcon}
                    class={`me-2 text-${statusType}`}
                />
                {headerMessage}</ToastHeader
            >
            <ToastBody class={`rounded-bottom border border-${statusType}`}
                ><div class="bg-light rounded-3 d-flex align-items-center">
                    <h5
                        id="result"
                        class="text-dark text-nowrap text-truncate py-2 ps-2 mb-0"
                    >
                        {cleanResult.result}
                    </h5>
                    <span
                        on:click={handleCopyToClipboard}
                        class="clipboard-button-wrapper ms-auto "
                        ><Icon
                            id="clipboard-button"
                            name={clipboardIcon}
                            class="text-dark fs-2 pe-2"
                        /></span
                    >
                    <Tooltip
                        target="result"
                        bind:isOpen={showClipboardMessage}
                        placement="top">copied to clipboard!</Tooltip
                    >
                    <Tooltip target="result">{cleanResult.result}</Tooltip>
                </div>
                <p>{cleanResult.message}</p>
                <p>
                    {cleanResult.count} character(s) removed from the original link
                </p></ToastBody
            >
        </Toast>
    </div>
</div>

<style>
    .clipboard-button-wrapper {
        cursor: pointer;
    }
</style>
