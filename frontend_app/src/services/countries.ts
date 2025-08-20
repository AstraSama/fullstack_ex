import type { ICountry } from "../types"

const API_BASE = import.meta.env.VITE_API_URL

export async function fetchCountries(name?: string, region?: string): Promise<ICountry[]> {
  let url = `${API_BASE}/countries`

  if (name) {
    url = `${API_BASE}/countries/${name}`
  } else if (region) {
    url = `${API_BASE}/countries/region/${region}`
  }

  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Erro ${res.status} ao buscar países`)
  }
  return res.json()
}
