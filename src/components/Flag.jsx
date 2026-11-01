import { flags } from '../content/flags.js';

export default function Flag({ code, large = false }) {
  return <span className={large ? 'flag flag--lg' : 'flag'} dangerouslySetInnerHTML={{ __html: flags[code] || '' }} />;
}
