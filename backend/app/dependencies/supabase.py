import os

from dotenv import load_dotenv
from supabase import create_client, Client


class SupabaseContextManager:
    def __init__(self) -> None:
        load_dotenv()
        url: str = os.getenv("SUPABASE_URL")
        key: str = os.getenv("SUPABASE_KEY")
        self.client: Client = create_client(supabase_url=url, supabase_key=key)

    def __enter__(self):
        return self.client

    def __exit__(self, exc_type, exc_value, traceback):
        pass


async def get_supa_client():
    with SupabaseContextManager() as sb:
        yield sb
