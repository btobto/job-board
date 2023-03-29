export function errorLogger(err: any) {
  const msgs = err.error.message;

  if (Array.isArray(msgs)) {
    msgs.forEach((msg) => {
      alert(msg);
    });
  } else {
    alert(msgs);
  }

  console.error(err);
}
