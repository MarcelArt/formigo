import type { Id, JsonResponse } from '@/types/json-response';
import type { OrganizationInput } from '@/types/organization';
import api from '.';

async function create(input: OrganizationInput): Promise<JsonResponse<Id>> {
	const res = await api.post('/organization', input);

	return res.data;
}

const organizationApi = {
	create,
};
export default organizationApi;
