<script>
    import { Tooltip } from 'sveltestrap';
</script>

<div class="text-light p-5 rounded-3 text-center border border-light">
    <img
        src="/logo_200x200.png"
        alt="link cleaner logo"
        height="200"
        width="200"
    />
    <h1 class="display-1">welcome</h1>
    <h3>enter your link below and we will try to clean it</h3>
    <button class="btn btn-link" id="why-clean" primary>why</button>
    <Tooltip target="why-clean" top>
        sometimes when you try to copy a social media link, they add extra
        information to the link to "track" what you're using it for. if you're
        like me, you don't like that. this tool can help</Tooltip
    >
</div>
