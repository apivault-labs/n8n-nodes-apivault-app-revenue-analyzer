import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestMethods,
	IRequestOptions,
} from 'n8n-workflow';
import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';

const ACTOR_ID = 'apivault_labs~app-revenue-analyzer';

export class AppRevenueAnalyzer implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Mobile App Revenue & Competitor Analyzer',
		name: 'appRevenueAnalyzer',
		icon: 'file:apprevenueanalyzer.svg',
		group: ['transform'],
		version: 1,
		description: 'Estimate any iOS app\'s revenue and downloads, see chart positions, update cadence, in-app purchases, developer portfolio and direct competitors. Paste an App Store link or app ID. Bulk, no login, no API key. Pay per result, $1/1K. CSV/JSON/Excel/API.',
		defaults: { name: 'Mobile App Revenue & Competitor Analyzer' },
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		usableAsTool: true,
		credentials: [{ name: 'apifyApi', required: true }],
		properties: [
   {
      "displayName": "Mode",
      "name": "mode",
      "description": "analyze = full reports for given apps. search = find top apps for keywords with estimates (ASO research).",
      "type": "options",
      "options": [
         {
            "name": "Analyze apps",
            "value": "analyze"
         },
         {
            "name": "Search by keyword (ASO)",
            "value": "search"
         }
      ],
      "default": "analyze"
   },
   {
      "displayName": "Keywords (search mode)",
      "name": "searchTerms",
      "description": "App-store keywords to search, e.g. 'meditation', 'budget tracker'. (comma or new-line separated)",
      "type": "string",
      "default": ""
   },
   {
      "displayName": "Apps per keyword",
      "name": "maxSearchResults",
      "description": "How many top results to return per keyword (1-50).",
      "type": "number",
      "default": 25,
      "typeOptions": {
         "minValue": 1,
         "maxValue": 50
      }
   },
   {
      "displayName": "Max parallel lookups",
      "name": "maxConcurrency",
      "description": "How many apps are processed in parallel (analyze mode). Higher = faster bulk runs.",
      "type": "number",
      "default": 10,
      "typeOptions": {
         "minValue": 1,
         "maxValue": 25
      }
   },
   {
      "displayName": "Apps",
      "name": "targets",
      "description": "Each item can be an App Store URL (apps.apple.com/.../id123456), a numeric App Store app ID, or a Google Play package name (v1: Play inputs return a free pointer to the iOS twin). (comma or new-line separated)",
      "type": "string",
      "default": ""
   },
   {
      "displayName": "Store country",
      "name": "country",
      "description": "Two-letter App Store country code (us, gb, de, ...). Affects ratings, charts and pricing.",
      "type": "string",
      "default": "us"
   }
],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		for (let i = 0; i < items.length; i++) {
			try {
				const body: Record<string, unknown> = {};
				body["mode"] = this.getNodeParameter("mode", i);
				{ const _v = this.getNodeParameter("searchTerms", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["searchTerms"] = _a; }
				body["maxSearchResults"] = this.getNodeParameter("maxSearchResults", i);
				body["maxConcurrency"] = this.getNodeParameter("maxConcurrency", i);
				{ const _v = this.getNodeParameter("targets", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["targets"] = _a; }
				body["country"] = this.getNodeParameter("country", i);
				const options: IRequestOptions = {
					method: 'POST' as IHttpRequestMethods,
					url: `https://api.apify.com/v2/acts/${ACTOR_ID}/run-sync-get-dataset-items`,
					body,
					json: true,
				};
				const response = await this.helpers.requestWithAuthentication.call(this, 'apifyApi', options);
				const results = Array.isArray(response) ? response : [response];
				for (const result of results) returnData.push({ json: result, pairedItem: { item: i } });
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: (error as Error).message }, pairedItem: { item: i } });
					continue;
				}
				throw new NodeOperationError(this.getNode(), error as Error, { itemIndex: i });
			}
		}
		return [returnData];
	}
}
