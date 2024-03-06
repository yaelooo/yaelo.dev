import { type APIGithubRepositories } from "src/types/api.ts";

export async function getLastRepositories(): Promise<{ data: APIGithubRepositories[] | null, error: any | null }> {
  let data: APIGithubRepositories[] = [];
  let error: string | null = null;

  try {
    const res: Response = await fetch(
      "https://api.github.com/users/yaelooo/repos?per_page=3&sort=updated",
      {
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