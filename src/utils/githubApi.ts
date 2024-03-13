import { type GithubOwner, type GithubRepository } from "src/types/api.ts"

const username = "yaelooo"
const url_api = `https://api.github.com`
const url_raw = `https://raw.githubusercontent.com`
const token = import.meta.env.PUBLIC_GITHUB_TOKEN

function handleStatusCodes(res: Response): void {
  const statusCodes: { [status: number]: string } = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
  }

  if (res.status < 200 || res.status >= 300) {
    if (statusCodes[res.status]) {
      throw new Error(statusCodes[res.status])
    } else {
      throw new Error(`HTTP error! status: ${res.status}`)
    }
  }
}

async function fetchDataFromAPI(url: string): Promise<{ data: any | null; error: any | null }> {
  let data = null
  let error = null

  try {
    const res: Response = await fetch(url, {
      headers: {
        Authorization: `token ${token}`,
      },
      cache: "force-cache",
    })

    handleStatusCodes(res)
    data = await res.json()
  } catch (err: unknown) {
    error = "Error fetching data: " + (err instanceof Error ? err.message : String(err))
  }

  return { data, error }
}

async function fetchDataFromRaw(url: string): Promise<{ data: string | null; error: any | null }> {
  let data = null
  let error = null

  try {
    const res: Response = await fetch(url)

    handleStatusCodes(res)
    data = await res.text()
  } catch (err: unknown) {
    error = "Error fetching data: " + (err instanceof Error ? err.message : String(err))
  }

  return { data, error }
}

export async function getProfile(): Promise<{ data: GithubOwner | null; error: any | null }> {
  return await fetchDataFromAPI(`${url_api}/users/${username}`)
}

export async function getRepositories(
  perPage: number
): Promise<{ data: GithubRepository | null; error: any | null }> {
  return await fetchDataFromAPI(
    `${url_api}/users/${username}/repos?per_page=${perPage}&sort=updated`
  )
}

export async function getRepository(
  repo: string
): Promise<{ data: GithubRepository | null; error: any | null }> {
  return await fetchDataFromAPI(`${url_api}/repos/${username}/${repo}`)
}

export async function getLanguages(
  repo: string
): Promise<{ data: { [key: string]: number } | null; error: any | null }> {
  return await fetchDataFromAPI(`${url_api}/repos/${username}/${repo}/languages`)
}

export async function getReadme(repo: string) {
  return await fetchDataFromRaw(`${url_raw}/${username}/${repo}/main/README.md`)
}

export function getProjectImageUrl(repo: string): string {
  return `${url_raw}/${username}/${repo}/main/.ignore/${repo}.webp`
}
