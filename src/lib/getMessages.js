export function withMessages(namespace) {
    return async function getServerSideProps({ locale }) {
      const messages = await import(`../messages/${locale}/${namespace}.js`).then((mod) => mod.default);
  
      return {
        props: {
          messages: { [namespace]: messages },
        },
      };
    };
  }
  