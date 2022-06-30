import type { SnippetConfig } from "$lib/blog/blogData";

const arduino: SnippetConfig = {
  name: "Arduino",
  language: "c",
  snippet: `
/* ...LED constants setup... */

void setup() {
  Serial.begin(9600);
  /* ...pinMode... */
}

int value = 0;

void loop() {  
  int newValue = read();
  if (newValue != -1 && value != newValue) {
    value = newValue;
    display();
    Serial.println(value);
  }

  delay(16);
}

int read() {
  int sensorValue = analogRead(A5);
  for (int i = 0; i < 10; i++) {
    if (sensorValue < i * 110 + 85) { return 9 - i; }
    if (sensorValue < i * 110 + 105) { return -1; }
  }
  return -1;
}

void display() {
  digitalWrite(4, LOW);
  if (value < 0 || value > 9) {
    shiftOut(3, 2, MSBFIRST, led_g);
  } else {
    shiftOut(3, 2, MSBFIRST, digits[value]);
  }
  digitalWrite(4, HIGH);
}`
};

const serial: SnippetConfig = {
  name: "Serial (Listener)",
  language: "ts",
  snippet: `
  import { ReadlineParser, SerialPort } from "serialport";
  
  const port = new SerialPort({
    path: "/dev/ttyACM0",
    baudRate: 9600
  });
  
  let timer: NodeJS.Timeout | null = null;
  let value: number = 0;
  
  const lineStream = port.pipe(new ReadlineParser());
  lineStream.on("data", (data: string) => {
    value = parseInt(data[0]);
    pushUpdate();
  });
  `
};

const firestore: SnippetConfig = {
  name: "Serial (Firestore)",
  language: "ts",
  snippet: `
  const currentDoc = db.doc("current/current");
  const historicCollection = db.collection("/historic");
  
  async function pushUpdate() {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const data = { value, timestamp };
    
    await Promise.all([
      currentDoc.update(data),
      historicCollection.add(data)
    ]);
    console.log(\`Updated \${value}\`);
  }
  `
};

const web: SnippetConfig = {
  name: "Website",
  language: "svelte",
  snippet: `
<script lang="ts">
  const currentDoc = doc(db, "current", "current");
  onSnapshot(currentDoc, doc => {
    const data = doc.data();
    if (data !== undefined) {
      value = data.value;
    }
  });

  let value: number | undefined = undefined;
</script>

{#if value !== undefined}
  <span>{value}</span>
{/if}
`
}

export default { arduino, serial, firestore, web };
