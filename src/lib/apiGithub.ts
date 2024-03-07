import { type APIGithubOwner, type APIGithubRepositories } from "src/types/api.ts";

const BASE_URL = "https://api.github.com/users/yaelooo";
const token = import.meta.env.PUBLIC_GITHUB_TOKEN;

async function fetchData(url: string): Promise<{ data: any | null, error: any | null }> {
  let data = null;
  let error = null;
  
  try {
    const res: Response = await fetch(
      url,
      {
        headers: {
          Authorization: `token ${token}`,
        },
        cache: "force-cache",
      }
      );

      const statusCodes: { [status: number]: string } = {
        400: "Bad Request",
        401: "Unauthorized",
        403: "Forbidden",
        404: "Not Found",
      };
    
      if (res.status >= 200 && res.status < 300) {
        data = await res.json();
      } else if (statusCodes[res.status]) {
        throw new Error(statusCodes[res.status]);
      } else {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
    } catch (err: unknown) {
      error = "Error fetching data: " + (err instanceof Error ? err.message : String(err));
    }
    
    return { data, error };
  }
  
  export async function getProfile(): Promise<{ data: APIGithubOwner | null, error: any | null }> {
    return await fetchData(`${BASE_URL}`);
  }
  
  export async function getRepositories(perPage: number): Promise<{ data: APIGithubRepositories | null, error: any | null }> {
    return await fetchData(`${BASE_URL}/repos?per_page=${perPage}&sort=updated`);
  }