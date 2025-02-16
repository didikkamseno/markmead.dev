import Link from 'next/link'

export default function Project({ path, title, description, role, tags }) {
  return (
    <li className="p-0 m-0">
      <Link
        as={`/projects/${path.replace(/\.md?$/, '')}`}
        href={`/projects/[slug]`}
      >
        <a className="block p-4 m-0 no-underline border rounded-lg border-slate-100 bg-slate-50 dark:border-slate-700 sm:bg-transparent sm:hover:bg-slate-50 dark:bg-slate-800 sm:dark:hover:bg-slate-800">
          <h3 className="m-0">{title}</h3>

          <div className="font-normal">
            <p>{description}</p>

            <small className="flex gap-2">
              <span>{role}</span>
              <span>&middot;</span>
              <span>{tags.join(', ')}</span>
            </small>
          </div>
        </a>
      </Link>
    </li>
  )
}
