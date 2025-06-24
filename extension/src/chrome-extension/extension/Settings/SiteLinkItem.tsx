import { Edit, Trash2 } from "lucide-react";

interface Props {
  site: string;
  remove: (site: string) => void;
  edit: (site: string) => void;
}

function SiteLinkItem({ site, remove, edit }: Props) {
  return (
    <div className="flex justify-between w-full gap-10">
      <p className="bg-[var(--input-background)] text-[var(--foreground)] p-1 border border-[var(--border)] rounded-sm flex-1 text-sm">
        {site}
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => remove(site)}
          className="hover:scale-[1.02] bg-[var(--background)]"
        >
          <Trash2 color="red" size={19} />
        </button>
        <button
          onClick={() => edit(site)}
          className="hover:scale-[1.02] bg-[var(--background)]"
        >
          <Edit color="var(--foreground)" size={19} />
        </button>
      </div>
    </div>
  );
}

export default SiteLinkItem;
