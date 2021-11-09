<script>
    import { defaultCleanResult } from './../constants/defaults.js';
    import CleanResult from './CleanResult.svelte';
    import LinkField from './LinkField.svelte';
    import SupportedLinks from './SupportedLinks.svelte';
    import { detectLinkType } from '../detectLinkType';
    import { cleanLinks } from '../cleanLinks';
    import Header from './Header.svelte';

    // state
    let inputValue = '';
    let validationMessage = '';
    let resultComponentReference;

    let cleanResult = {
        result: defaultCleanResult.result,
        cleaned: defaultCleanResult.cleaned,
        message: defaultCleanResult.message,
        count: defaultCleanResult.count,
    };

    function changeCleanValues(
        result = defaultCleanResult.result,
        cleaned = defaultCleanResult.cleaned,
        message = defaultCleanResult.message,
        count = defaultCleanResult.count,
    ) {
        cleanResult.result = result;
        cleanResult.cleaned = cleaned;
        cleanResult.message = message;
        cleanResult.count = count;
    }

    // helpers
    function handleValidate() {
        if (inputValue === '')
            return (validationMessage = 'please enter a link');
        validationMessage = '';
        const type = detectLinkType(inputValue);
        if (type === null)
            return (validationMessage = 'this type of link is not supported');
        return handleClean();
    }

    // handlers
    function handleReset() {
        validationMessage = '';
        inputValue = '';
        changeCleanValues();
        !!resultComponentReference && resultComponentReference.onReset();
    }

    function handleClean() {
        if (validationMessage !== '') return;
        changeCleanValues();
        const { result, cleaned, message, count } = cleanLinks(inputValue);
        changeCleanValues(result, cleaned, message, count);
    }
</script>

<div class="container">
    <Header />
    <SupportedLinks />
    <LinkField
        on:validate={handleValidate}
        on:reset={handleReset}
        bind:value={inputValue}
        bind:validationMessage
    />
    {#if !!cleanResult.result}
        <CleanResult bind:this={resultComponentReference} bind:cleanResult />
    {/if}
</div>
