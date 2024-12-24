export interface MetadataType {
  //ID of the metadata
  name: string;
  ISIN: string;
  ticker: string;
  description: string;
  cusip: string | null;
  logo: string | null;
  webUrl: string | null;
  //Type/Category of the instrument
  type: string;
  sector: string;
  industry: string;
  //issuer
  countryName: string;
  countryIso: string;
  currency: string;
  address: string;
  //valuation
}
