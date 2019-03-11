<template>
  <footer class="info">
    <p>
      Written by
      <a href="http://twitter.com/lukeed05">Luke Edwards</a>
    </p>
    <p>
      Refactored by
      <a href="https://github.com/xorgy">Aaron Muir Hamilton</a>
    </p>
    <p>
      Part of
      <a href="http://todomvc.com">TodoMVC</a>
    </p>
    <p>
      Extension made by
      <a href="https://instagram.com/arthurwebdev">Arthur Eichelberger</a>
    </p>
  </footer>
</template>

<style scoped>
footer {
  display: flex;
  justify-content: center;
  width: 100%;
}

@media screen and (max-width: 768px) {
  footer {
    flex-direction: column;
  }

  footer p {
    margin: 0.5rem 0;
  }
}

footer p a {
  display: block;
}
</style>


<script>
    export default {
        name: "Footer"
    };
</script>
