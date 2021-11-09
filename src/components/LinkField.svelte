<script>
    import { Button, InputGroup, Input } from 'sveltestrap';
    import { createEventDispatcher } from 'svelte';

    // props
    export let value = '';
    export let validationMessage = '';

    const dispatch = createEventDispatcher();

    // handlers
    function handleValidate() {
        dispatch('validate');
    }

    function handleReset() {
        dispatch('reset');
    }

    // reactive variables
    $: invalidInput = validationMessage !== '';
</script>

<div class="row m-0 mt-3">
    <div class="col-12 text-center">
        <InputGroup>
            <Input
                type="text"
                bind:value
                placeholder="enter your link here"
                invalid={invalidInput}
            />
            <Button on:click={handleValidate} color="primary">clean</Button>
            <Button on:click={handleReset} color="danger">reset</Button>
        </InputGroup>
        <div class="text-danger">{validationMessage}</div>
    </div>
</div>
